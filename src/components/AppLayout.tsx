import React from 'react';
import Navigation from './Navigation';
import EcommerceHero from './EcommerceHero';
import SellerFeatures from './SellerFeatures';
import BuyerFeatures from './BuyerFeatures';
import TechStack from './TechStack';
import AdvancedFeatures from './AdvancedFeatures';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <EcommerceHero />
        <SellerFeatures />
        <BuyerFeatures />
        <TechStack />
        <AdvancedFeatures />
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;