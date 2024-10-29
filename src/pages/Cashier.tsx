import React from 'react';
import { useOrderStore } from '../store/orderStore';
import { CreditCard, Receipt } from 'lucide-react';

export function Cashier() {
  const { orders, updateOrderStatus } = useOrderStore();
  const readyOrders = orders.filter(
    (order) => order.status === 'ready' || order.status === 'served'
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Payment Processing</h1>
        <div className="space-y-6">
          {readyOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Table {order.tableNumber}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'ready'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span>
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    <span className="font-medium">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => updateOrderStatus(order.id, 'paid')}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Process Payment
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Print Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}