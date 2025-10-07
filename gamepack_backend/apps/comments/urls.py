from django.urls import path
from .views import CommentCreateView, CommentDestroyView

urlpatterns = [
    path('articles/<slug:slug>/comments/', CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/', CommentDestroyView.as_view(), name='comment-delete'),
]