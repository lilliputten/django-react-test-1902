# -*- coding:utf-8 -*-

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.Home, name='Home'),
    url(r'^About/$', views.About, name='About'),
    url(r'^Contacts/$', views.Contacts, name='Contacts'),
]
