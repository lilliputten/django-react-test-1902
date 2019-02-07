# from django.shortcuts import render

# from django.http import Http404
from django.http import HttpResponse
# from django.template import loader
# from django.shortcuts import get_object_or_404, render
# from .models import Question

import os.path

import subprocess
# from nodejs.bindings import node_run

import django


CWD = os.path.dirname(os.path.realpath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
PROJECT_ROOT = os.path.abspath(os.path.dirname(__name__))


def index(request):
    # # DEBUG!
    # f = open(os.path.join(SITE_ROOT, 'django.log'), 'a+')
    # f.write('react1 index log\n')
    # f.close()
    return HttpResponse(
        '<ul>\n' +
        '<li><a href="env_test">env_test</a></li>\n' +
        '<li><a href="node_test">node_test</a></li>\n' +
        '</ul>'
    )


def env_test(request):
    return HttpResponse(
        '<pre>' +
        '<h1>env_test</h1>\n' +
        'CWD: ' + CWD + '\n' +
        'SITE_ROOT: ' + SITE_ROOT + '\n' +
        'PROJECT_ROOT: ' + PROJECT_ROOT + '\n' +
        'Django version: ' + '.'.join(map(lambda x: str(x), django.VERSION)) + '\n' +
        '</pre>'
    )


def node_test(request):
    script_name = os.path.join(SITE_ROOT, 'react1', 'node-test.js')
    # stderr, stdout = node_run(script_name, '--some-argument')
    # p = subprocess.Popen(["node", "-v"], stdout=subprocess.PIPE)
    p = subprocess.Popen(["node", script_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, err = p.communicate()
    # output = result[0]
    output = 'Script: ' + script_name + '\n' + output + '\n'
    if err:
        output += 'Error: ' + err
    output = '<h1>node_test</h1>' + '<pre>' + output + '</pre>'
    return HttpResponse(output)
