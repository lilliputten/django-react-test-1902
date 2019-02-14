# -*- coding:utf-8 -*-

import os.path

CWD = os.path.dirname(os.path.realpath(__file__))
SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
PROJECT_ROOT = os.path.abspath(os.path.dirname(__name__))


class ReactWrapper:

    # def __init__(self, name):
    #     self.name = name

    def getEnv(self):
        return {
            'CWD': CWD,
            'SITE_ROOT': SITE_ROOT,
            'PROJECT_ROOT': PROJECT_ROOT,
        }

    def getTest(self):
        return 'Test'
