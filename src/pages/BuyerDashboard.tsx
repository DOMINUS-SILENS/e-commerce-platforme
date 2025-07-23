import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Heart, User } from 'lucide-react';

const BuyerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Smartphone Pro', price: 899, image: '/placeholder.svg', category: 'Electronics' },
    { id: 2, name: 'Wireless Headphones', price: 199, image: '/placeholder.svg', category: 'Audio' },
    { id: 3, name: 'Laptop Ultra', price: 1299, image: '/placeholder.svg', category: 'Computers' },
    { id: 4, name: 'Smart Watch', price: 299, image: '/placeholder.svg', category: 'Wearables' }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Espace Acheteur</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {cart.length}
                </Badge>
              )}
            </Button>
            <Button variant="outline">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-purple-200 focus:border-purple-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-purple-100">
              <CardHeader className="pb-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant="secondary" className="w-fit">{product.category}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Ajouter au Panier
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;