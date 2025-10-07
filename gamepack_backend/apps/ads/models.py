from django.db import models

class Advertisement(models.Model):
    class DisplayPosition(models.TextChoices):
        HOMEPAGE_TOP = "HOMEPAGE_TOP", "Homepage Top Banner"
        SIDEBAR = "SIDEBAR", "Sidebar Ad"
        ARTICLE_INLINE = "ARTICLE_INLINE", "In-Article Ad"

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='ads/')
    link = models.URLField()
    active = models.BooleanField(default=True)
    display_position = models.CharField(max_length=50, choices=DisplayPosition.choices)

    def __str__(self):
        return self.title