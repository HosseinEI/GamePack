from django.urls import path
from .views import ActiveAdsListView

urlpatterns = [
    path('ads/', ActiveAdsListView.as_view(), name='active-ads'),
]