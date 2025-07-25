import React from 'react';
import { X, ShoppingBag, Search, Filter, Heart, User, CreditCard, Gift, HeadphonesIcon, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: ShoppingBag, label: 'Catalogue', badge: 'New' },
    { icon: Search, label: 'Recherche Avancée' },
    { icon: Filter, label: 'Filtres Intelligents' },
    { icon: ShoppingBag, label: 'Mon Panier', badge: '3' },
    { icon: Heart, label: 'Wishlist', badge: '12' },
  ];

  const personalizedItems = [
    { icon: Sparkles, label: 'Recommandations IA' },
    { icon: User, label: 'Mon Profil' },
    { icon: ShoppingBag, label: 'Historique Achats' },
    { icon: Settings, label: 'Préférences' },
  ];

  const serviceItems = [
    { icon: CreditCard, label: 'Paiements & Livraison' },
    { icon: Gift, label: 'Récompenses', badge: 'VIP' },
    { icon: HeadphonesIcon, label: 'Support Client' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      <div className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-purple-50 to-pink-50 shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              COMMERCIUM
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">🛍️ SHOPPING</h3>
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start hover:bg-purple-100"
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">🎯 PERSONNALISÉ</h3>
              <div className="space-y-2">
                {personalizedItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start hover:bg-purple-100"
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">⚡ SERVICES</h3>
              <div className="space-y-2">
                {serviceItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start hover:bg-purple-100"
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto text-purple-600">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };