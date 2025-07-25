import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ModernHeader } from './ModernHeader';
import { HeroSection } from './HeroSection';
import { ProductGrid } from './ProductGrid';
import { Footer } from './Footer';

interface AppLayoutProps {
  user: any;
}

const AppLayout: React.FC<AppLayoutProps> = ({ user }) => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      toggleSidebar();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ModernHeader onMenuClick={handleMenuClick} user={user} />
      <main>
        <HeroSection />
        <ProductGrid user={user} />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;