# core/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter

# --- Import ONLY ViewSets for the Master Router ---
from apps.articles.views import ArticleViewSet
from apps.reviews.views import ReviewViewSet
# We will NOT import UserViewSet or AdViewSet here

# --- 1. Define Master Router (for clean ViewSets) ---
master_router = DefaultRouter()
master_router.register('articles', ArticleViewSet, basename='article')
master_router.register('reviews', ReviewViewSet, basename='review')

# --- 2. Define urlpatterns (Hybrid approach) ---
urlpatterns = [
    # Admin Interface
    path('admin/', admin.site.urls),

    # 🎯 Part A: MASTER ROUTER (Articles and Reviews)
    path('api/', include(master_router.urls)), 
    
    # 🎯 Part B: MANUAL INCLUDES (Users, Ads, Comments, Settings)
    # These apps must manage their own path segments within their local urls.py
    path('api/', include('apps.users.urls')),
    path('api/', include('apps.ads.urls')),
    path('api/', include('apps.comments.urls')),
    path('api/', include('apps.articles.urls')),
    
    # Djoser Authentication URLs
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    
    # Settings is usually a separate endpoint
    path('api/settings/', include('apps.settings_app.urls')),

    # Frontend Redirect
    path('', RedirectView.as_view(url='http://localhost:5173/', permanent=False)),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)