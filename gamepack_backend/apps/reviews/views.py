from rest_framework import viewsets
from .models import Review
from .serializers import ReviewSerializer
from apps.articles.permissions import IsEditorOrAdminOrReadOnly

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related('reviewer').all()
    serializer_class = ReviewSerializer
    permission_classes = [IsEditorOrAdminOrReadOnly]