from rest_framework import serializers
from .models import Article, Category, Tag
from apps.users.serializers import UserSerializer
from apps.comments.serializers import CommentSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']

class ArticleListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Article
        fields = ['title', 'slug', 'image', 'author', 'category', 'tags', 'published_at']

class ArticleDetailSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    # Use write-only fields for create/update operations to accept IDs
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), source='tags', write_only=True, many=True
    )

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'content', 'image', 'author', 'category', 'tags',
            'published_at', 'updated_at', 'views_count', 'comments', 'category_id', 'tag_ids'
        ]
        read_only_fields = ('slug', 'author', 'views_count')

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)