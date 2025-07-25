import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, Package, ShoppingCart, BarChart3, 
  Megaphone, MessageCircle, Shield, Settings,
  Home, Users, FileText, Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'store', label: 'Ma Boutique', icon: Store },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
    { id: 'analytics', label: 'Analyses', icon: BarChart3 },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'customers', label: 'Clients', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className={`bg-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} min-h-screen`}>
      <div className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={`w-full justify-start text-left ${activeTab === item.id ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {isOpen && <span>{item.label}</span>}
              </Button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;