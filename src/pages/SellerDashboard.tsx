import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, TrendingUp, DollarSign, Edit } from 'lucide-react';

const SellerDashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Smartphone Pro', price: 899, stock: 25, sales: 15, status: 'active' },
    { id: 2, name: 'Wireless Headphones', price: 199, stock: 50, sales: 32, status: 'active' },
    { id: 3, name: 'Laptop Ultra', price: 1299, stock: 10, sales: 8, status: 'active' }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: ''
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, {
        id: Date.now(),
        name: newProduct.name,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock) || 0,
        sales: 0,
        status: 'active'
      }]);
      setNewProduct({ name: '', price: '', description: '', stock: '' });
      setShowAddProduct(false);
    }
  };

  const totalSales = products.reduce((sum, product) => sum + (product.sales * product.price), 0);
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Espace Vendeur</h1>
          <Button 
            onClick={() => setShowAddProduct(true)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Produit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <DollarSign className="h-5 w-5" />
                Ventes Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalSales}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Package className="h-5 w-5" />
                Produits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <TrendingUp className="h-5 w-5" />
                Stock Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{totalStock}</div>
            </CardContent>
          </Card>
        </div>

        {showAddProduct && (
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle>Ajouter un Nouveau Produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nom du produit"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="border-green-200 focus:border-green-400"
              />
              <Input
                placeholder="Prix"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="border-green-200 focus:border-green-400"
              />
              <Input
                placeholder="Stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="border-green-200 focus:border-green-400"
              />
              <Textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="border-green-200 focus:border-green-400"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Ajouter
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddProduct(false)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-green-100">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prix:</span>
                    <span className="font-semibold text-green-600">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-semibold">{product.stock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vendus:</span>
                    <span className="font-semibold text-blue-600">{product.sales}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-green-200 hover:bg-green-50 text-green-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;