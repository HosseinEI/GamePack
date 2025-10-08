from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


class Comment(models.Model):
    article = models.ForeignKey('articles.Article', on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    review = models.ForeignKey( 'reviews.Review', on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        # Count how many parent objects are set
        parent_count = sum([1 for field in [self.article, self.review] if field is not None])
        
        if parent_count == 0:
            raise ValidationError('A comment must be linked to an Article or a Review.')
        if parent_count > 1:
            raise ValidationError('A comment cannot be linked to both an Article and a Review.')
    
    def __str__(self):
        parent_type = ""
        parent_title = ""
        
        if self.article:
            parent_type = "Article"
            parent_title = getattr(self.article, 'title', 'Unknown Article') # Use getattr for safety
        elif self.review:
            parent_type = "Review"
            parent_title = getattr(self.review, 'game_title', 'Unknown Review') # Assuming Review uses game_title
        else:
            parent_type = "ORPHANED ITEM"
            parent_title = "ERROR"

        return f"Comment by {self.user.username} on {parent_type}: {parent_title}"

    class Meta:
        ordering = ['created_at']
