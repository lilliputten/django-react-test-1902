# -*- coding:utf-8 -*-

# import django
# # from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
# import os.path
# import subprocess
# import json
import logging
from django.conf import settings

from lib.ReactWrapper import ReactWrapper

logger = logging.getLogger(__name__)

reactWrapper = ReactWrapper()

# CWD = os.path.dirname(os.path.realpath(__file__))
# SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
# PROJECT_ROOT = os.path.abspath(os.path.dirname(__name__))


class ReactAppView(View):
    title = '[ReactApp]'
    template = 'ReactApp/react-base.html'
    component = 'index.js'

    # def Home(request):
    #     # test = reactWrapper.getTest()
    #     # env = reactWrapper.getEnv()
    #     return HttpResponse(
    #         '<h1>reactapp Home</h1>\n' +
    #         # '<p>env: ' + str(envStr + '</p>\n' +
    #         '<ol>\n' +
    #         '<li>Home</li>\n' +
    #         '<li><a href="/About">About</a></li>\n' +
    #         '<li><a href="/Contacts">Contacts</a></li>\n' +
    #         '</ol>'
    #     )

    def get(self, request):
        # test = reactWrapper.getTest()
        # env = reactWrapper.getEnv()

        props = {
            'users': [
                {'username': 'alice'},
                {'username': 'bob'},
            ]
        }

        context = {
            'title': self.title,
            'component': self.component,
            'props': props,
            'settings': settings,
            # 'request': request,
            'location': {
                'uri': request.build_absolute_uri(),
                'host': request.get_host(),
                'path': str(request.get_full_path()),
            },
        }

        logger.info('context: ' + str(context))

        return render(request, self.template, context)

        # return HttpResponse(
        #     '<h1>reactapp Home</h1>\n' +
        #     # '<p>env: ' + str(envStr + '</p>\n' +
        #     '<ol>\n' +
        #     '<li>Home</li>\n' +
        #     '<li><a href="/About">About</a></li>\n' +
        #     '<li><a href="/Contacts">Contacts</a></li>\n' +
        #     '</ol>'
        # )


# def Home(request):
#     # test = reactWrapper.getTest()
#     # env = reactWrapper.getEnv()
#     return HttpResponse(
#         '<h1>reactapp Home</h1>\n' +
#         # '<p>env: ' + str(envStr + '</p>\n' +
#         '<ol>\n' +
#         '<li>Home</li>\n' +
#         '<li><a href="/About">About</a></li>\n' +
#         '<li><a href="/Contacts">Contacts</a></li>\n' +
#         '</ol>'
#     )
#
#
# def About(request):
#     return HttpResponse(
#         '<h1>reactapp About</h1>\n'
#         '<ol>\n' +
#         '<li><a href="/">Home</a></li>\n' +
#         '<li>About</li>\n' +
#         '<li><a href="/Contacts">Contacts</a></li>\n' +
#         '</ol>'
#     )
#
#
# def Contacts(request):
#     return HttpResponse(
#         '<h1>reactapp Contacts</h1>\n'
#         '<ol>\n' +
#         '<li><a href="/">Home</a></li>\n' +
#         '<li><a href="/About">About</a></li>\n' +
#         '<li>Contacts</li>\n' +
#         '</ol>'
#     )
