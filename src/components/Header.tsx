import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/blog', label: 'Blog' },
  { to: '#productos', label: 'Productos' },
  { to: '#testimonios', label: 'Testimonios' },
  { to: '#contacto', label: 'Contacto' },
];

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header className="bg-blue-800 text-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Instal Tancaments</h1>
        <nav className="space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:underline transition-colors duration-200 px-2 py-1 rounded ${location.pathname === link.to ? 'bg-blue-600' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 