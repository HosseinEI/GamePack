import { create } from 'zustand';
// import { jwtDecode } from 'jwt-decode';
import { User } from '../types';
import axiosClient from '../api/axiosClient';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (data: { access: string; refresh: string }) => void;
  logout: () => void;
  loadUserFromToken: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  user: null,
  isAuthenticated: !!localStorage.getItem('accessToken'),

  login: (data) => {
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    set({ accessToken: data.access, refreshToken: data.refresh, isAuthenticated: true });
    get().loadUserFromToken();
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false });
  },

  loadUserFromToken: async () => {
    const token = get().accessToken;
    if (token) {
      try {
        // The profile endpoint should fetch the user details
        const response = await axiosClient.get('profile/');
        set({ user: response.data });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        get().logout();
      }
    }
  },
}));