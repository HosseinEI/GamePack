from rest_framework.permissions import BasePermission, SAFE_METHODS
from apps.users.models import User

class IsEditorOrAdminOrReadOnly(BasePermission):
    """
    Allows read access to anyone.
    Allows write access only to users with 'EDITOR' or 'ADMIN' roles.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role in [User.Role.EDITOR, User.Role.ADMIN]