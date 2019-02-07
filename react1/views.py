# -*- coding:utf-8 -*-

import django
from django.http import HttpResponse
import os.path
import subprocess
import json

CWD = os.path.dirname(os.path.realpath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
PROJECT_ROOT = os.path.abspath(os.path.dirname(__name__))


def index(request):
    # # DEBUG!
    # f = open(os.path.join(SITE_ROOT, 'django.log'), 'a+')
    # f.write('react1 index log\n')
    # f.close()
    return HttpResponse(
        '<h1>react1 tests</h1>\n'
        '<ol>\n' +
        '<li><a href="env_test">env_test</a></li>\n' +
        '<li><a href="node_test">node_test</a></li>\n' +
        '<li><a href="node_stdin">node_stdin</a></li>\n' +
        '<li><a href="node_pass_json">node_pass_json</a></li>\n' +
        '<li><a href="node_change_json">node_change_json</a></li>\n' +
        '</ol>'
    )


def env_test(request):
    p = subprocess.Popen(['node', '-v'], stdout=subprocess.PIPE)
    node_version = p.communicate()
    return HttpResponse(
        '<pre>' +
        '<h1>env_test</h1>\n' +
        'CWD: ' + CWD + '\n' +
        'SITE_ROOT: ' + SITE_ROOT + '\n' +
        'PROJECT_ROOT: ' + PROJECT_ROOT + '\n' +
        'Django version: ' + '.'.join(map(lambda x: str(x), django.VERSION)) + '\n' +
        'Node version: ' + node_version + '\n' +
        '</pre>'
    )


def node_test(request):
    script_name = os.path.join(SITE_ROOT, 'react1', 'node-test.js')
    p = subprocess.Popen(['node', script_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, err = p.communicate()
    output = 'Script: ' + script_name + '\nResult: ' + output + '\n'
    if err:
        output += 'Error: ' + err + '\n'
    output = '<h1>node_test</h1>' + '<pre>' + output + '</pre>'
    return HttpResponse(output)


def node_stdin(request):
    script_name = os.path.join(SITE_ROOT, 'react1', 'node-stdin.js')
    p = subprocess.Popen(
        ['node', script_name],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    input_data = b'test input\n'
    output, err = p.communicate(input=input_data)
    output = 'Script: ' + script_name + '\nResult: ' + output + '\n'
    if err:
        output += 'Error: ' + err + '\n'
    output = '<h1>node_stdin</h1>' + '<pre>' + output + '</pre>'
    return HttpResponse(output)


def node_pass_json(request):
    script_name = os.path.join(SITE_ROOT, 'react1', 'node-pass-json.js')
    p = subprocess.Popen(
        ['node', script_name],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    data = {
        'president': {
            'name': 'Zaphod Beeblebrox',
            'species': 'Betelgeusian',
        }
    }
    json_data = json.dumps(data)
    output, err = p.communicate(input=json_data)
    output = 'Script: ' + script_name + '\nResult:\n' + output + '\n'
    if err:
        output += 'Error: ' + err + '\n'
    output = '<h1>node_pass_json</h1>' + '<pre>' + output + '</pre>'
    return HttpResponse(output)


def node_change_json(request):
    script_name = os.path.join(SITE_ROOT, 'react1', 'node-change-json.js')
    p = subprocess.Popen(
        ['node', script_name],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    data = {
        'name': 'Zaphod Beeblebrox',
    }
    json_data = json.dumps(data)
    output, err = p.communicate(input=json_data)
    if not err:
        output = 'Data: ' + str(json.loads(output))
    output = 'Script: ' + script_name + '\nResult:\n' + output + '\n'
    if err:
        output += 'Error: ' + err + '\n'
    output = '<h1>node_change_json</h1>' + '<pre>' + output + '</pre>'
    return HttpResponse(output)
