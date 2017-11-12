from django.conf.urls import url

from rest_api import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
]
