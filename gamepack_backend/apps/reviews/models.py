from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator 
from django.conf import settings

class Review(models.Model):
    game_title = models.CharField(max_length=200)
    
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=1, 
        validators=[MinValueValidator(0.5), MaxValueValidator(10.0)]
    )
    
    summary = models.TextField(
        max_length=500, 
        blank=True, 
        null=True,
        help_text="A short, one-paragraph summary or verdict for the review."
    )
    
    content = models.TextField()
    image = models.ImageField(upload_to='reviews/', null=True, blank=True)
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return f"Review for {self.game_title} by {self.reviewer.username}"