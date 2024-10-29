import { create } from 'zustand';
import { Order, OrderStatus } from '../types/order';

interface OrderState {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
    })),
  addOrder: (newOrder) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          ...newOrder,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),
}));