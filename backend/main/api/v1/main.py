from django.contrib.auth import get_user_model
from django.db.models.expressions import RawSQL
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_auth.views import UserDetailsView
from rest_framework import serializers, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.fields import CurrentUserDefault
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import BasePermission, IsAuthenticated

from main.models import User, Meal, USER_ROLE_ADMIN, USER_ROLE_MANAGER, CaloriesPerDay


class MealUserSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=CurrentUserDefault())
    exceeded_calories_per_day = serializers.ReadOnlyField()

    class Meta:
        model = Meal
        fields = ('date', 'time', 'text', 'calories', 'user', 'id', 'exceeded_calories_per_day',)


class MealAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ('date', 'time', 'text', 'calories', 'user', 'id')


class MealFilter(filters.FilterSet):
    class Meta:
        model = Meal
        fields = {
            'date': ['lte', 'gte'],
            'time': ['lte', 'gte'],
        }


class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all().order_by('-date', '-time', '-id')
    filter_backends = (DjangoFilterBackend,)
    filterset_class = MealFilter

    def get_queryset_for_admin(self):
        return self.queryset

    def get_queryset_for_user(self):
        return self.queryset.filter(user=self.request.user)

    def get_queryset(self):
        if self.request.user.role == USER_ROLE_ADMIN:
            return self.get_queryset_for_admin()
        else:
            return self.get_queryset_for_user()

    def get_serializer_class(self):
        if self.request.user.role == USER_ROLE_ADMIN:
            return MealAdminSerializer
        return MealUserSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'role',)
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        if password:
            del validated_data['password']
        instance = super(UserSerializer, self).update(instance, validated_data)
        if password:
            instance.set_password(password)

        instance.save()

        return instance


class UserSerializerWithRoleReadOnly(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'role',)
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'read_only': True}
        }


class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        if request.user.role in (USER_ROLE_ADMIN, USER_ROLE_MANAGER):
            return True
        return False


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, IsAdminOrManager)

    def get_serializer_class(self):
        if self.request.user.role in (USER_ROLE_ADMIN, USER_ROLE_MANAGER):
            return UserSerializer
        raise PermissionDenied


class CaloriesPerDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaloriesPerDay
        fields = ('value',)


class MaxCaloriesSettingView(RetrieveUpdateAPIView):
    serializer_class = CaloriesPerDaySerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        obj, _ = CaloriesPerDay.objects.get_or_create(user=self.request.user)
        return obj


class UserInfoView(UserDetailsView):
    """
    Reads and updates UserModel fields
    Accepts GET, PUT, PATCH methods.

    Default accepted fields: username, first_name, last_name
    Default display fields: pk, username, email, first_name, last_name
    Read-only fields: pk, email

    Returns UserModel fields.
    """
    serializer_class = UserSerializer
