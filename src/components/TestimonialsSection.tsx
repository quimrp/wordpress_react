import React from 'react';

const testimonials = [
  {
    name: 'Ana García',
    text: '¡Excelente servicio y productos de calidad! Recomiendo totalmente a Mi Empresa.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Luis Pérez',
    text: 'La instalación fue rápida y profesional. Muy satisfecho con el resultado.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Marta López',
    text: 'Atención personalizada y productos innovadores. ¡Volveré a comprar!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const TestimonialsSection: React.FC = () => (
  <section id="testimonios" className="py-16 bg-blue-50">
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold text-center mb-10 text-blue-800">Testimonios</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 border-4 border-blue-200" />
            <p className="text-gray-700 italic mb-4 text-center">"{testimonial.text}"</p>
            <span className="font-semibold text-blue-900">{testimonial.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection; 