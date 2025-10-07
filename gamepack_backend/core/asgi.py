# core/asgi.py
import os

from django.core.asgi import get_asgi_application

# Points Django to the correct settings file
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Fetch the application instance
application = get_asgi_application()