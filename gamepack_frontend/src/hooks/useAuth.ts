import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, loadUserFromToken } = useAuthStore();

  if (isAuthenticated && !user) {
    loadUserFromToken();
  }

  return { user, isAuthenticated, login, logout };
};