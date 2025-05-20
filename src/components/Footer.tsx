import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-blue-700 text-white py-6 mt-12">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:underline">Aviso legal</a>
        <a href="#" className="hover:underline">Política de privacidad</a>
      </div>
    </div>
  </footer>
);

export default Footer; 