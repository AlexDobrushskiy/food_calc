from django.conf.urls import url
from django.urls import include

from main.api.v1.main import MaxCaloriesSettingView
from main.api.v1.router import router

urlpatterns = [
    url(r'^max_calories/$', MaxCaloriesSettingView.as_view()),
    url(r'', include(router.urls)),
]
