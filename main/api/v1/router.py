from rest_framework import routers
from main.api.v1.main import UserViewSet, MealViewSet

router = routers.DefaultRouter()

router.register(r'user', UserViewSet)
router.register(r'meal', MealViewSet)
