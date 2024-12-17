import React from 'react';

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-3xl font-bold tracking-wide hover:text-gray-300 transition-all duration-300 cursor-pointer">
          DecantShop
        </div>

        {/* Navegación */}
        <ul className="flex space-x-6 text-white">
          <li>
            <button
              onClick={() => setCurrentPage('list')}
              className="hover:text-blue-400 transition-all duration-300"
            >
              📝 Lista de Perfumes
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage('add')}
              className="hover:text-blue-400 transition-all duration-300"
            >
              ➕ Agregar Perfume
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage('decants')}
              className="hover:text-blue-400 transition-all duration-300"
            >
              📦 Lista de Decants
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage('addDecant')}
              className="hover:text-blue-400 transition-all duration-300"
            >
              ✏️ Agregar Decant
            </button>
          </li>
        </ul>

        {/* Botón de perfil (placeholder) */}
        <div className="flex items-center space-x-2">
          <span className="text-white hidden sm:block">Pablo Toledo</span>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md cursor-pointer">
            <span className="text-white font-bold">P</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;