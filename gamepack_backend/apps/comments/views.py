from rest_framework import generics, permissions
from rest_framework.exceptions import NotFound, ValidationError
from .models import Comment
from .serializers import CommentSerializer
from .permissions import IsOwnerOrReadOnly
from apps.articles.models import Article
from apps.reviews.models import Review

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        
        article_slug = self.kwargs.get('slug')
        if article_slug:
            try:
                article = Article.objects.get(slug=article_slug)
                serializer.save(user=user, article=article)
                return
            except Article.DoesNotExist:
                raise NotFound(detail="Article not found.")

        review_id = self.kwargs.get('review_id')
        if review_id:
            try:
                review = Review.objects.get(id=review_id)
                serializer.save(user=user, review=review)
                return
            except Review.DoesNotExist:
                raise NotFound(detail="Review not found.")
            
        raise ValidationError("Invalid URL: Comment must be linked to an Article or a Review.")

class CommentDestroyView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]