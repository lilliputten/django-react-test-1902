# -*- coding:utf-8 -*-

# import django
# # from django.shortcuts import get_object_or_404
from django.shortcuts import render
# from django.http import HttpResponse
from django.views import View
import os.path
import subprocess
import json
import logging
# from django.conf import settings

from lib.ReactWrapper import ReactWrapper

logger = logging.getLogger(__name__)

reactWrapper = ReactWrapper()

# Debugging script (requires all chunks separately)
useDebugChunks = True

# NOTE: See in `ReactWrapper.getEnv()`
# CWD = os.path.dirname(os.path.realpath(__file__))
# SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
# PROJECT_ROOT = os.path.abspath(os.path.dirname(__name__))


class ReactAppView(View):

    title = '[ReactApp]'  # TODO
    template = 'ReactApp/react-base.html'
    component = 'index.js'

    def get(self, request):

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
            # 'settings': settings,
            # 'request': request,
            'location': {
                'uri': request.build_absolute_uri(),
                'host': request.get_host(),
                'path': str(request.get_full_path()),
            },
        }

        env = reactWrapper.getEnv()
        SITE_ROOT = env['SITE_ROOT']

        script_name = useDebugChunks \
            and os.path.join(SITE_ROOT, 'react', 'render.js') \
            or os.path.join(SITE_ROOT, 'react', 'build', 'render-merged.min.js')
        p = subprocess.Popen(
            ['node', script_name, '--all-chunks', '--console--debug'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

        logger.info('script: ' + script_name)  # DEBUG
        script_input = json.dumps(context)
        logger.info('script_input: ' + script_input)  # DEBUG
        output, err = p.communicate(input=script_input)
        # output = 'Script: ' + script_name + '\nResult:\n' + output + '\n'  # DEBUG
        if err:
            output += 'Error: ' + err + '\n'
        # output = '<h1>node_pass_json</h1>' + '<pre>' + output + '</pre>'  # DEBUG
        logger.info(output)  # DEBUG

        data = json.loads(output)
        context.update(data)

        return render(request, self.template, context)
