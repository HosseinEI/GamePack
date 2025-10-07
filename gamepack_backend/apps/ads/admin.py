# apps/ads/admin.py
from django.contrib import admin
from .models import Advertisement

@admin.register(Advertisement)
class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('title', 'active', 'display_position', 'link')
    list_filter = ('active', 'display_position')