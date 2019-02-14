# -*- coding:utf-8 -*-

# import django
# # from django.shortcuts import get_object_or_404
# from django.shortcuts import render
from django.http import HttpResponse
# import os.path
# import subprocess
# import json

import logging

logger = logging.getLogger(__name__)

# CWD = os.path.dirname(os.path.realpath(__file__))
# SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
# PROJECT_ROOT = os.path.abspath(os.path.dirname(__name__))


def Home(request):
    logger.info('reactapp Home Ok')
    return HttpResponse(
        '<h1>reactapp Home</h1>\n'
        '<ol>\n' +
        '<li>Home</li>\n' +
        '<li><a href="/About">About</a></li>\n' +
        '<li><a href="/Contacts">Contacts</a></li>\n' +
        '</ol>'
    )


def About(request):
    return HttpResponse(
        '<h1>reactapp About</h1>\n'
        '<ol>\n' +
        '<li><a href="/">Home</a></li>\n' +
        '<li>About</li>\n' +
        '<li><a href="/Contacts">Contacts</a></li>\n' +
        '</ol>'
    )


def Contacts(request):
    return HttpResponse(
        '<h1>reactapp Contacts</h1>\n'
        '<ol>\n' +
        '<li><a href="/">Home</a></li>\n' +
        '<li><a href="/About">About</a></li>\n' +
        '<li>Contacts</li>\n' +
        '</ol>'
    )
