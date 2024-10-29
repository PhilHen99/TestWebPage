import React from 'react';
import { useAuthStore } from '../store/authStore';
import { BarChart3, Users, ShoppingCart, ChefHat } from 'lucide-react';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { title: 'Daily Revenue', value: '$2,854.00', icon: BarChart3, change: '+14.5%' },
    { title: 'Active Staff', value: '24', icon: Users, change: '+2.4%' },
    { title: 'Pending Orders', value: '12', icon: ShoppingCart, change: '-4.5%' },
    { title: 'Kitchen Status', value: 'Normal', icon: ChefHat, change: 'On Track' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="text-gray-600">Here's what's happening today</p>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.change.includes('+') ? 'text-green-600' : stat.change.includes('-') ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add more dashboard content here */}
      </div>
    </div>
  );
}