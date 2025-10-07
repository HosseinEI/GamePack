# apps/reviews/admin.py
from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('game_title', 'rating', 'reviewer', 'published_at')
    list_filter = ('rating', 'published_at')
    search_fields = ('game_title', 'content')
    raw_id_fields = ('reviewer',)