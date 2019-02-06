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
    # DEBUG!
    f = open(os.path.join(SITE_ROOT, 'django.log'), 'a+')
    f.write('react1 index log\n')
    f.close()
    return HttpResponse(
        "CWD: " + CWD + "<br/>\n" +
        "SITE_ROOT: " + SITE_ROOT + "<br/>\n" +
        "PROJECT_ROOT: " + PROJECT_ROOT + "<br/>\n" +
        "Django version: " + '.'.join(map(lambda x: str(x), django.VERSION)) + "<br/>\n" +
        ""
    )


def test(request):
    script_name = os.path.join(SITE_ROOT, 'node-test.js')
    # stderr, stdout = node_run(script_name, '--some-argument')
    # p = subprocess.Popen(["node", "-v"], stdout=subprocess.PIPE)
    p = subprocess.Popen(["node", script_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, err = p.communicate()
    # output = result[0]
    output = 'Script: ' + script_name + '\n' + output + '\n'
    if err:
        output += 'Error: ' + err
    output = '<pre>' + output + '</pre>'
    return HttpResponse(output)
