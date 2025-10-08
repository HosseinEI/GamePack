from rest_framework import serializers
from .models import Comment
from apps.users.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user','article', 'review','content', 'created_at']
        read_only_fields = ('user','article', 'review')
    
    def create(self, validated_data):
        return Comment.objects.create(**validated_data) 