# -*- coding:utf-8 -*-

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^env_test/$', views.env_test, name='env_test'),
    url(r'^node_test/$', views.node_test, name='node_test'),
    url(r'^node_stdin/$', views.node_stdin, name='node_stdin'),
]
