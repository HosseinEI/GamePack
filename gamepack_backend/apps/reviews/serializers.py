from rest_framework import serializers
from .models import Review
from apps.users.serializers import UserSerializer
from apps.comments.serializers import CommentSerializer 

class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'game_title', 'rating', 'summary', 'content', 'image', 'reviewer', 'comments', 'published_at', 'updated_at']
        read_only_fields = ('reviewer',)

    def create(self, validated_data):
        validated_data['reviewer'] = self.context['request'].user
        return super().create(validated_data)