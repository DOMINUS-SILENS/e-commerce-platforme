import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';

const DashboardStats: React.FC = () => {
  const { orders, loading: ordersLoading } = useOrders();
  const { products, loading: productsLoading } = useProducts();

  const stats = React.useMemo(() => {
    if (ordersLoading || productsLoading) {
      return [
        { title: 'Ventes du Mois', value: '€0', change: '+0%', trend: 'up', icon: DollarSign, color: 'text-green-600' },
        { title: 'Commandes', value: '0', change: '+0%', trend: 'up', icon: ShoppingCart, color: 'text-blue-600' },
        { title: 'Clients Actifs', value: '0', change: '+0%', trend: 'up', icon: Users, color: 'text-purple-600' },
        { title: 'Produits', value: '0', change: '+0%', trend: 'up', icon: Package, color: 'text-orange-600' }
      ];
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(orders.map(order => order.customer_email)).size;
    const totalProducts = products.length;

    return [
      {
        title: 'Ventes du Mois',
        value: `€${totalRevenue.toLocaleString()}`,
        change: '+12.5%',
        trend: 'up' as const,
        icon: DollarSign,
        color: 'text-green-600'
      },
      {
        title: 'Commandes',
        value: totalOrders.toString(),
        change: '+8.2%',
        trend: 'up' as const,
        icon: ShoppingCart,
        color: 'text-blue-600'
      },
      {
        title: 'Clients Actifs',
        value: uniqueCustomers.toString(),
        change: '+15.3%',
        trend: 'up' as const,
        icon: Users,
        color: 'text-purple-600'
      },
      {
        title: 'Produits',
        value: totalProducts.toString(),
        change: products.length > 0 ? '+2.1%' : '0%',
        trend: 'up' as const,
        icon: Package,
        color: 'text-orange-600'
      }
    ];
  }, [orders, products, ordersLoading, productsLoading]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center mt-2">
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </Badge>
                <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;