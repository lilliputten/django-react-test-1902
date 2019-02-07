# -*- coding:utf-8 -*-

import os.path

import subprocess


def test_stdin():

    print 'test-stdin:'

    script_name = os.path.join('.', 'node-stdin.js')
    p = subprocess.Popen(
        ['node', script_name],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    input_data = b'one\ntwo\nthree\nfour\nfive\nsix\n'

    output, err = p.communicate(input=input_data)

    output = 'Script: ' + script_name + '\nResult: ' + output + '\n'

    if err:
        output += 'Error: ' + err

    # output = 'xx'

    print output


test_stdin()
