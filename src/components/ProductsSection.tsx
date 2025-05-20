import React from 'react';

const products = [
  {
    title: 'Ventanas de PVC',
    description: 'Aislamiento y eficiencia energética para tu hogar.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Puertas de Seguridad',
    description: 'Protege lo que más importa con nuestras puertas reforzadas.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Persianas Automáticas',
    description: 'Comodidad y control con solo un clic.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
];

const ProductsSection: React.FC = () => (
  <section id="productos" className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold text-center mb-10 text-blue-800">Nuestros Productos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, idx) => (
          <div key={idx} className="bg-blue-50 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-blue-900">{product.title}</h4>
            <p className="text-blue-700 mb-4 text-center">{product.description}</p>
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Ver más</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection; 