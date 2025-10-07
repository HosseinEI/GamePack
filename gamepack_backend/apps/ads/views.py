from rest_framework import generics, permissions
from .models import Advertisement
from .serializers import AdvertisementSerializer

class ActiveAdsListView(generics.ListAPIView):
    serializer_class = AdvertisementSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Advertisement.objects.filter(active=True)