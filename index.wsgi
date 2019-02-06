# -*- coding: utf-8 -*-

import os
import sys
import time
import traceback
import signal

# activate_this = '/home/g/goldenjeru/.virtualenv/bin/activate_this.py'
activate_this = '/home/g/goldenjeru/.venv_django_react/bin/activate_this.py'
with open(activate_this) as f:
    code = compile(f.read(), activate_this, 'exec')
    exec(code, dict(__file__=activate_this))

SITE_ROOT = '/home/g/goldenjeru/lilliputten.ru/django-test-1902/'
sys.path.insert(1, SITE_ROOT)

# # DEBUG!
# f = open(os.path.join(SITE_ROOT, 'django.log'), 'a+')
# f.write('index.wsgi log\n')
# f.close()

import django

if django.VERSION[1] <= 6:
    os.environ['DJANGO_SETTINGS_MODULE'] = 'default_settings'
    import django.core.handlers.wsgi
    application = django.core.handlers.wsgi.WSGIHandler()
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'default_settings')
    from django.core.wsgi import get_wsgi_application
    try:
        application = get_wsgi_application()
    except RuntimeError:
        traceback.print_exc()
        os.kill(os.getpid(), signal.SIGINT)
        time.sleep(2.5)

