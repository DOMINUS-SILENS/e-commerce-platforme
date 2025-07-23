import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CreditCard, Gift, Headphones, Brain } from 'lucide-react';

const BuyerFeatures: React.FC = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-pink-500" />,
      title: "🎯 Expérience Personnalisée",
      items: ["🤖 Recommandations AI", "🔍 Filtres intelligents", "📚 Historique complet", "💖 Wishlist dynamique", "🎨 Interface adaptive"]
    },
    {
      icon: <CreditCard className="h-8 w-8 text-emerald-500" />,
      title: "💳 Paiements & Livraison",
      items: ["💳 Paiement CB sécurisé", "📱 Wallets numériques", "₿ Crypto-monnaies", "📦 Suivi colis temps réel", "🏪 Points relais"]
    },
    {
      icon: <Gift className="h-8 w-8 text-yellow-500" />,
      title: "🎁 Fidélisation & Récompenses",
      items: ["⭐ Points cumulables", "👑 Badges clients VIP", "🎂 Avantages anniversaires", "🎊 Challenges gamifiés", "🏆 Récompenses exclusives"]
    },
    {
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      title: "🧑‍💼 Service Client",
      items: ["🤖 Chatbot 24/7", "❓ F.A.Q dynamique", "🎫 Tickets support", "📞 Support vocal", "📧 Email prioritaire"]
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "🧠 Tech Augmentée",
      items: ["🥽 Réalité augmentée (AR)", "👔 Essai virtuel", "🤖 Assistant d'achat IA", "📸 Recherche par image", "🗣️ Commande vocale"]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800 text-lg px-4 py-2">
            🛍️ POUR LES ACHETEURS
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Expérience d'Achat Révolutionnaire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies avancées pour une expérience d'achat personnalisée et immersive
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

export default BuyerFeatures;