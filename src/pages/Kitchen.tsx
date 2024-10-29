import React from 'react';
import { useOrderStore } from '../store/orderStore';
import { Clock, CheckCircle } from 'lucide-react';

export function Kitchen() {
  const { orders, updateOrderStatus } = useOrderStore();
  const pendingOrders = orders.filter(
    (order) => order.status === 'pending' || order.status === 'preparing'
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Kitchen Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Table {order.tableNumber}</h2>
                <span className="text-sm text-gray-500">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span className="font-medium">
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    {item.notes && (
                      <span className="text-sm text-gray-500">{item.notes}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                {order.status === 'pending' ? (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Start Preparing
                  </button>
                ) : (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Mark as Ready
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}