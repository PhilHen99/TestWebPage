export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'paid';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  total: number;
}