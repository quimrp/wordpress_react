import React from 'react';

const HeroFullWhite: React.FC = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="flex flex-col lg:flex-row-reverse items-center gap-12 p-8 bg-white rounded-2xl shadow-2xl w-full max-w-5xl">
      <img
        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        className="max-w-sm rounded-lg shadow-2xl"
        alt="Box Office News"
      />
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold mb-6">Box Office News!</h1>
        <p className="py-6 text-lg text-gray-700">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold shadow hover:bg-[var(--primary-color-dark)] transition">
          Get Started
        </button>
      </div>
    </div>
  </div>
);

export default HeroFullWhite; 