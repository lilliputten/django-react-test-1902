# from django.shortcuts import render

# from django.http import Http404
from django.http import HttpResponse
# from django.template import loader
# from django.shortcuts import get_object_or_404, render
# from .models import Question

import subprocess


def index(request):
    return HttpResponse("index")


def test(request):
    # subprocess.call(["node", "-v"])
    p = subprocess.Popen(["node", "-v"], stdout=subprocess.PIPE)
    result = p.communicate()
    output = result[0]
    return HttpResponse(output)
