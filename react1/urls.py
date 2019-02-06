from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    # example: /admin1/test/
    url(r'^test/$', views.test, name='test'),
]
