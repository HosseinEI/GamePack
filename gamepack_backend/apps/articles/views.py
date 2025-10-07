from rest_framework import viewsets
from .models import Article, Category, Tag
from .serializers import ArticleListSerializer, ArticleDetailSerializer, CategorySerializer, TagSerializer
from .permissions import IsEditorOrAdminOrReadOnly

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related('author', 'category').prefetch_related('tags', 'comments').all()
    permission_classes = [IsEditorOrAdminOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticleListSerializer
        return ArticleDetailSerializer
        
    def get_queryset(self):
        queryset = super().get_queryset()
        # Filter by category slug
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        # Filter by tag slug
        tag_slug = self.request.query_params.get('tag')
        if tag_slug:
            queryset = queryset.filter(tags__slug=tag_slug)
        return queryset

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsEditorOrAdminOrReadOnly]
    lookup_field = 'slug'

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsEditorOrAdminOrReadOnly]
    lookup_field = 'slug'