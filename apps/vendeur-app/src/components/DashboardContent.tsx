import React from 'react';
import DashboardStats from './DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const recentOrders = [
    { id: '#12847', customer: 'Marie Dubois', amount: '€89.99', status: 'Livré', date: '2024-01-15' },
    { id: '#12846', customer: 'Jean Martin', amount: '€156.50', status: 'En cours', date: '2024-01-15' },
    { id: '#12845', customer: 'Sophie Laurent', amount: '€45.00', status: 'Expédié', date: '2024-01-14' },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 45, revenue: '€44,955' },
    { name: 'MacBook Air M2', sales: 23, revenue: '€25,770' },
    { name: 'AirPods Pro', sales: 67, revenue: '€16,750' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Aperçu de votre boutique en ligne</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Produit
        </Button>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Commandes Récentes
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge variant={order.status === 'Livré' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produits Top Ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} ventes</p>
                  </div>
                  <p className="font-medium text-green-600">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;