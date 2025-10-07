# core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    # API Routes
    path('admin/', admin.site.urls),
    path('api/', include('djoser.urls')),
    path('api/', include('djoser.urls.authtoken')),
    path('api/', include('apps.users.urls')),
    path('api/', include('apps.articles.urls')),
    path('api/', include('apps.reviews.urls')),
    path('api/', include('apps.comments.urls')),
    path('api/', include('apps.ads.urls')),
    path('api/', include('apps.settings_app.urls')),
    
    path('', RedirectView.as_view(url='http://localhost:5173/', permanent=False)),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)