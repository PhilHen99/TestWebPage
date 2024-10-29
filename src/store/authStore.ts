import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@pos.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Cashier User',
    email: 'cashier@pos.com',
    role: 'cashier',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Chef User',
    email: 'chef@pos.com',
    role: 'chef',
    avatar: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    name: 'Waitress User',
    email: 'waitress@pos.com',
    role: 'waitress',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simulate API call
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user && password === '123456') {
      set({ user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));