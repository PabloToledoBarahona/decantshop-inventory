import React from 'react';

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">DecantShop</h1>
      <div className="space-x-4">
        <button onClick={() => setCurrentPage('list')} className="hover:text-gray-400">
          Lista de Perfumes
        </button>
        <button onClick={() => setCurrentPage('add')} className="hover:text-gray-400">
          Agregar Perfume
        </button>
      </div>
    </nav>
  );
};

export default Navbar;