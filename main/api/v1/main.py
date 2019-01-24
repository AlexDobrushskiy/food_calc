from rest_framework import serializers, viewsets, mixins, status, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.fields import CurrentUserDefault, SkipField
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.relations import PKOnlyObject
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from main.models import User, Meal, USER_ROLE_ADMIN



class MealUserSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Meal
        fields = ('date', 'time', 'text', 'calories', 'user', 'id')


class MealAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ('date', 'time', 'text', 'calories', 'user', 'id')


class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()

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
        if self.request.user.is_staff:
            return MealAdminSerializer
        return MealUserSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'password', 'daily_calories')
        extra_kwargs = {
            'password': {'write_only': True},
        }


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # authentication_classes = (CsrfExemptSessionAuthentication,)
    # permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response('Created', status=status.HTTP_201_CREATED)
