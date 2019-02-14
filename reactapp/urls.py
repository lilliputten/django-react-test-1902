# -*- coding:utf-8 -*-

from django.conf.urls import url

# from . import views
from ReactApp.views import ReactAppView

urlpatterns = [
    url(r'^$', ReactAppView.as_view()),
    url(r'^About/$', ReactAppView.as_view()),
    # url(r'^$', views.Home, name='Home'),
    # url(r'^About/$', views.About, name='About'),
    # url(r'^Contacts/$', views.Contacts, name='Contacts'),
]
