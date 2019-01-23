from rest_framework import routers
from main.api.main import UserViewSet

router = routers.DefaultRouter()

router.register(r'user', UserViewSet)
