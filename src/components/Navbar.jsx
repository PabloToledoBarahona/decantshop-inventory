import React, { useState } from 'react';
import { FiMenu, FiX, FiList, FiPlusCircle, FiPackage, FiUserPlus } from 'react-icons/fi';

const Navbar = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Cierra el menú al seleccionar una opción
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => handleNavigation('home')}
          className="text-white text-2xl font-semibold tracking-wide hover:text-gray-400 transition-all duration-300 cursor-pointer"
        >
          DecantShop
        </div>

        {/* Botón hamburguesa */}
        <button
          className="text-white text-3xl lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menú de navegación */}
        <ul
          className={`lg:flex lg:space-x-8 text-gray-300 text-lg lg:static absolute top-full left-0 w-full bg-gray-800 lg:bg-transparent lg:w-auto ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <button
              onClick={() => handleNavigation('list')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiList />
              Lista de Perfumes
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('add')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiPlusCircle />
              Agregar Perfume
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('decants')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiPackage />
              Lista de Decants
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('addDecant')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiUserPlus />
              Agregar Decant
            </button>
          </li>
        </ul>

        {/* Perfil */}
        <div className="hidden lg:flex items-center space-x-3">
          <span className="text-gray-300 font-medium">Pablo Toledo</span>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-500 transition duration-300">
            <span className="text-white font-semibold">P</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;