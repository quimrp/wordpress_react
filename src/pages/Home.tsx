import React from 'react';
import Hero from '../components/Hero';
import HeroFullWhite from '../components/HeroFullWhite';
import ProductsSection from '../components/ProductsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import TaiwindTest from '../components/taiwind_test';
import Features from '../components/Features';

const Home: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <TaiwindTest />
        <HeroFullWhite />
        <ProductsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
};

export default Home; 