import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, Package, BarChart3, Megaphone, MessageCircle, Shield } from 'lucide-react';

const SellerFeatures: React.FC = () => {
  const features = [
    {
      icon: <Store className="h-8 w-8 text-blue-500" />,
      title: "🏬 Boutiques Personnalisées",
      items: ["✨ Création intuitive", "🎨 Branding personnalisé", "🎭 Thèmes dynamiques", "🌐 URL dédiée", "📱 Vitrine responsive"]
    },
    {
      icon: <Package className="h-8 w-8 text-green-500" />,
      title: "📦 Gestion Produits",
      items: ["⚡ CRUD avancé", "🔄 Variantes multiples", "📊 Stock temps réel", "🏷️ Tags et catégories", "📁 Import/Export CSV"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: "📊 Commandes & Ventes",
      items: ["📈 Tableau analytique", "💰 Suivi des ventes", "🔄 Gestion retours", "🛒 Analyse paniers", "📊 Rapports détaillés"]
    },
    {
      icon: <Megaphone className="h-8 w-8 text-orange-500" />,
      title: "📣 Marketing & Promotions",
      items: ["🎫 Bons de réduction", "📧 Campagnes email", "🎯 Placement stratégique", "📱 Marketing automation", "💡 Recommandations AI"]
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-cyan-500" />,
      title: "💬 Communication Client",
      items: ["💬 Chat temps réel", "⭐ Gestion des avis", "📝 Réponses publiques", "🔔 Notifications push", "📞 Support multicanal"]
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "🛡️ Sécurité & Support",
      items: ["🔐 Authentification 2FA", "📋 Journal d'activité", "🆘 Support priorisé", "🔒 Sécurité avancée", "⚡ Monitoring 24/7"]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 text-lg px-4 py-2">
            🔰 POUR LES VENDEURS
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Outils Professionnels Complets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce dont vous avez besoin pour créer, gérer et développer votre boutique en ligne
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700 flex items-center">
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerFeatures;