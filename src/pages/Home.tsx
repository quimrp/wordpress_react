import React from 'react';
import Layout from '../components/Layout'
import Hero from '../components/Hero';
import TaiwindTest from '../components/taiwind_test';
import Features from '../components/Features';
import AboutUs from '../components/AboutUs';
import PriceTable from '../components/PriceTable';
import FichaVentana from '../components/FichaVentana';

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <TaiwindTest />
      <AboutUs />
      <PriceTable />
      <FichaVentana />
    </Layout>
  );
};

export default Home; 