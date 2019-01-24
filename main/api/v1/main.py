from rest_framework import serializers, viewsets, mixins, status, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.fields import CurrentUserDefault, SkipField
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.relations import PKOnlyObject
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from main.models import User, Meal, USER_ROLE_ADMIN, USER_ROLE_MANAGER


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
        if self.request.user.role == USER_ROLE_ADMIN:
            return UserSerializer
        if self.request.user.role == USER_ROLE_MANAGER:
            return UserSerializerWithRoleReadOnly
        raise PermissionDenied
