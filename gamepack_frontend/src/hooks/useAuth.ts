import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, loadUserFromToken } = useAuthStore();

  // Load user from token on initial app load if authenticated
  // This logic can be moved to a top-level component if preferred
  if (isAuthenticated && !user) {
    loadUserFromToken();
  }

  return { user, isAuthenticated, login, logout };
};