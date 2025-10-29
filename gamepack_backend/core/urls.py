# core/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from apps.articles.views import ArticleViewSet
from apps.reviews.views import ReviewViewSet


master_router = DefaultRouter()
master_router.register('articles', ArticleViewSet, basename='article')
master_router.register('reviews', ReviewViewSet, basename='review')

urlpatterns = [
    # Admin Interface
    path('admin/', admin.site.urls),

    path('api/', include(master_router.urls)), 
    

    path('api/', include('apps.users.urls')),
    path('api/', include('apps.ads.urls')),
    path('api/', include('apps.comments.urls')),
    path('api/', include('apps.articles.urls')),
    
    # Djoser Authentication URLs
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    
    path('api/settings/', include('apps.settings_app.urls')),

    # Frontend Redirect
    path('', RedirectView.as_view(url='http://localhost:5173/', permanent=False)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)