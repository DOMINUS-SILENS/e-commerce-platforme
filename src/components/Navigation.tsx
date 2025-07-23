import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/6830d8b67ad005d7129c74a3_1753025011224_b1688705.png" 
                alt="EMPORIUM Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EMPORIUM
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/buyer">
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Espace Acheteur
              </Button>
            </Link>
            <Link to="/seller">
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-none font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Store className="h-4 w-4 mr-2" />
                Espace Vendeur
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Connexion
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;