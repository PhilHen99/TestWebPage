import React, { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useOrderStore } from '../store/orderStore';
import { MenuItem, OrderItem } from '../types/order';
import { Plus, Minus, Send } from 'lucide-react';

export function Orders() {
  const menuItems = useMenuStore((state) => state.items);
  const addOrder = useOrderStore((state) => state.addOrder);
  const [tableNumber, setTableNumber] = useState<number>(1);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const addMenuItem = (menuItem: MenuItem) => {
    const existingItem = selectedItems.find(
      (item) => item.menuItem.id === menuItem.id
    );

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        { id: Math.random().toString(36).substr(2, 9), menuItem, quantity: 1 },
      ]);
    }
  };

  const removeMenuItem = (menuItem: MenuItem) => {
    const existingItem = selectedItems.find(
      (item) => item.menuItem.id === menuItem.id
    );

    if (existingItem?.quantity === 1) {
      setSelectedItems(
        selectedItems.filter((item) => item.menuItem.id !== menuItem.id)
      );
    } else if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const submitOrder = () => {
    if (selectedItems.length === 0) return;

    const total = selectedItems.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );

    addOrder({
      tableNumber,
      items: selectedItems,
      status: 'pending',
      total,
    });

    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Table Number
          </label>
          <input
            type="number"
            min="1"
            value={tableNumber}
            onChange={(e) => setTableNumber(parseInt(e.target.value))}
            className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeMenuItem(item)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="w-8 text-center">
                      {selectedItems.find((i) => i.menuItem.id === item.id)
                        ?.quantity || 0}
                    </span>
                    <button
                      onClick={() => addMenuItem(item)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Current Order</h2>
            <div className="space-y-4">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.menuItem.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.menuItem.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>
                    $
                    {selectedItems
                      .reduce(
                        (sum, item) =>
                          sum + item.menuItem.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={submitOrder}
                disabled={selectedItems.length === 0}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}