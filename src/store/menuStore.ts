import { create } from 'zustand';
import { MenuItem } from '../types/order';

interface MenuState {
  items: MenuItem[];
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    price: 12.99,
    category: 'Main Course',
    description: 'Beef patty with lettuce, tomato, and cheese',
  },
  {
    id: '2',
    name: 'Caesar Salad',
    price: 8.99,
    category: 'Starters',
    description: 'Romaine lettuce, croutons, parmesan cheese',
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    price: 14.99,
    category: 'Main Course',
    description: 'Fresh tomatoes, mozzarella, and basil',
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    price: 6.99,
    category: 'Desserts',
    description: 'Rich chocolate cake with ganache',
  },
];

export const useMenuStore = create<MenuState>(() => ({
  items: MOCK_MENU_ITEMS,
}));