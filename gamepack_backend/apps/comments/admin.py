# apps/comments/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Comment

class CommentAdmin(admin.ModelAdmin):
    list_display = ('parent_object_display', 'user', 'content_snippet', 'created_at')
    list_filter = ('created_at', 'article', 'review',)
    search_fields = ('content',)
    raw_id_fields = ('article', 'user')

    def parent_object_display(self, obj):
        if obj.article:
            # Displays Article title and links to Article admin page
            return format_html(
                '<a href="{}/">{}: {}</a>',
                obj.article.pk, 
                "Article", 
                obj.article.title
            )
        elif obj.review:
            try:
                review_title = getattr(obj.review, 'game_title', 'Review (No Title Field)')
                return format_html(
                    '<a href="{}/">{}: {}</a>',
                    obj.review.pk, 
                    "Review", 
                    review_title
                )
            except AttributeError:
                # Fallback if 'game_title' doesn't exist on Review
                return format_html("Review: No Title")
        return "-" # Fallback for orphaned/unsaved comments

    parent_object_display.short_description = 'Parent Object'
    
    def content_snippet(self, obj):
        return obj.content[:30] + '...' if len(obj.content) > 30 else obj.content
    content_snippet.short_description = 'Content'
    
admin.site.register(Comment, CommentAdmin)