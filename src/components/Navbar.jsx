import React from 'react';

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-gray-900 hover:opacity-80">
          Decant<span className="text-blue-500">Shop</span>
        </h1>

        {/* Navegación */}
        <div className="flex space-x-6">
          <button
            onClick={() => setCurrentPage('list')}
            className="text-gray-600 hover:text-blue-500 hover:underline transition"
          >
            Lista de Perfumes
          </button>
          <button
            onClick={() => setCurrentPage('add')}
            className="text-gray-600 hover:text-blue-500 hover:underline transition"
          >
            Agregar Perfume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;