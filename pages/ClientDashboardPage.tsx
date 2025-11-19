import React from 'react';
import Header from '../components/Header';
import { Compass } from '../components/Icons';

const ClientDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-alasla-gray-light">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="flex justify-center items-center mb-6">
            <Compass className="w-24 h-24 text-alasla-red" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-alasla-dark mb-4 animate-fade-in">Tu próxima aventura te espera</h1>
          <p className="text-lg text-alasla-gray-dark max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Nuestro panel de cliente está casi listo. Muy pronto podrás gestionar tus reservas y explorar destinos increíbles.
          </p>
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              disabled
              className="px-8 py-3.5 font-bold rounded-full text-white bg-gradient-to-r from-alasla-red-start to-alasla-red-end opacity-60 cursor-not-allowed"
            >
              Buscar propiedades (Próximamente)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboardPage;