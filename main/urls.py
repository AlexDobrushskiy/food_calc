from django.conf.urls import url
from django.urls import include
from main.api.v1.router import router

urlpatterns = [
    url(r'', include(router.urls)),
]
