import React, { useState } from 'react';
import { FiMenu, FiX, FiList, FiPlusCircle, FiPackage, FiUserPlus, FiShuffle, FiShoppingCart, FiUsers } from 'react-icons/fi';

const Navbar = ({ setCurrentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Cierra la sidebar al seleccionar una opción
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64`}
      >
        <button
          className="text-white text-3xl lg:hidden p-4"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="p-4 text-2xl font-bold tracking-wide">DecantShop</div>
        <ul className="space-y-4">
          {/* Inventario */}
          <li>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-700"
              onClick={() => toggleSection('inventory')}
            >
              <FiPackage />
              Inventario
            </button>
            {activeSection === 'inventory' && (
              <ul className="space-y-2 pl-8">
                <li>
                  <button
                    onClick={() => handleNavigation('list')}
                    className="hover:underline"
                  >
                    Lista de Perfumes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('decants')}
                    className="hover:underline"
                  >
                    Lista de Decants
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('add')}
                    className="hover:underline"
                  >
                    Agregar Perfume
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('addDecant')}
                    className="hover:underline"
                  >
                    Agregar Decant
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('transfers')}
                    className="hover:underline"
                  >
                    Transferencias
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Ventas */}
          <li>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-700"
              onClick={() => toggleSection('sales')}
            >
              <FiShoppingCart />
              Ventas
            </button>
            {activeSection === 'sales' && (
              <ul className="space-y-2 pl-8">
                <li>
                  <button
                    onClick={() => handleNavigation('ventas')}
                    className="hover:underline"
                  >
                    Lista de Ventas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('clientes')}
                    className="hover:underline"
                  >
                    Clientes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('vendedores')}
                    className="hover:underline"
                  >
                    Vendedores
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('proveedores')}
                    className="hover:underline"
                  >
                    Proveedores
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8 ml-64">{/* Aquí se renderizan las páginas */}</div>
    </div>
  );
};

export default Navbar;