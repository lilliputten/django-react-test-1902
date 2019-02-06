# from django.shortcuts import render

# from django.http import Http404
from django.http import HttpResponse
# from django.template import loader
# from django.shortcuts import get_object_or_404, render
# from .models import Question

import os.path

import subprocess
from nodejs.bindings import node_run

CWD = os.path.dirname(os.path.realpath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
PROJECT_ROOT = os.path.abspath(os.path.dirname(__name__))


def index(request):
    return HttpResponse(
        "CWD: " + CWD + "<br/>\n" +
        "PROJECT_ROOT: " + PROJECT_ROOT + "<br/>\n" +
        ""
    )


def test(request):
    script_name = os.path.join(SITE_ROOT, 'node-test.js')
    # stderr, stdout = node_run(script_name, '--some-argument')
    # p = subprocess.Popen(["node", "-v"], stdout=subprocess.PIPE)
    p = subprocess.Popen(["node", script_name], stdout=subprocess.PIPE)
    result = p.communicate()
    output = result[0]
    return HttpResponse(script_name + ' => ' + output)
