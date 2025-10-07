# core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/auth/', include('apps.users.urls')),
#     path('api/', include('apps.articles.urls')),
#     path('api/', include('apps.reviews.urls')),
#     path('api/', include('apps.comments.urls')),
#     path('api/', include('apps.ads.urls')),
#     path('api/', include('apps.settings_app.urls')),
# ]
urlpatterns = [
    # API Routes
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/users/', include('apps.users.urls')),
    path('api/articles/', include('apps.articles.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
    path('api/comments/', include('apps.comments.urls')),
    path('api/ads/', include('apps.ads.urls')),
    path('api/settings/', include('apps.settings_app.urls')),
    
    path('', RedirectView.as_view(url='http://localhost:5173/', permanent=False)),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)