from django.db import models

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/')
    contact_email = models.EmailField()
    social_links = models.JSONField(default=dict)

    def __str__(self):
        return self.site_name
        
    # Ensure only one instance of settings can be created
    def save(self, *args, **kwargs):
        self.pk = 1
        super(SiteSettings, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj