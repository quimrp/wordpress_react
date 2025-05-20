import React from 'react';
import HeaderHero from '../components/HeaderHero';
import Hero from '../components/Hero';
import HeroFullWhite from '../components/HeroFullWhite';
import ProductsSection from '../components/ProductsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import TaiwindTest from '../components/taiwind_test';
import WhatsAppChatMock from '../components/whatappBot';

const Home: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <TaiwindTest />
        <WhatsAppChatMock />
        <HeroFullWhite />
        <ProductsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
};

export default Home; 