# core/wsgi.py
import os

from django.core.wsgi import get_wsgi_application

# Points Django to the correct settings file
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()