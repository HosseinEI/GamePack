from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import SiteSettings
from .serializers import SiteSettingsSerializer

class SiteSettingsView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SiteSettingsSerializer

    def get(self, request, *args, **kwargs):
        settings_obj = SiteSettings.load()
        serializer = self.get_serializer(settings_obj)
        return Response(serializer.data)