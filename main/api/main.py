from rest_framework import serializers, viewsets, mixins, status, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.fields import CurrentUserDefault, SkipField
from rest_framework.relations import PKOnlyObject
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from main.models import User


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

    # http_method_names = ['get', 'post', 'head']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response('Created', status=status.HTTP_201_CREATED)
