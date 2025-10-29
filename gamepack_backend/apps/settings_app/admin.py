# apps/settings_app/admin.py
from django.contrib import admin
from .models import SiteSettings

class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'contact_email')

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

admin.site.register(SiteSettings, SiteSettingsAdmin)