# apps/settings_app/admin.py
from django.contrib import admin
from .models import SiteSettings

# Use a custom admin class to hide the 'Add SiteSettings' button 
# since it's a singleton model.
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'contact_email')

    def has_add_permission(self, request):
        # Allow adding only if no settings object exists
        return not SiteSettings.objects.exists()

admin.site.register(SiteSettings, SiteSettingsAdmin)