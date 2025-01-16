import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import {
  FiMenu,
  FiX,
  FiList,
  FiPlusCircle,
  FiPackage,
  FiUserPlus,
  FiShuffle,
  FiShoppingCart,
  FiUsers,
} from 'react-icons/fi';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSection = (section) =>
    setActiveSection(activeSection === section ? '' : section);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64`}
      >
        <button className="text-white text-3xl lg:hidden p-4" onClick={toggleSidebar}>
          <FiX />
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
                  <Link to="/list" className="hover:underline">
                    Lista de Perfumes
                  </Link>
                </li>
                <li>
                  <Link to="/decants" className="hover:underline">
                    Lista de Decants
                  </Link>
                </li>
                <li>
                  <Link to="/add" className="hover:underline">
                    Agregar Perfume
                  </Link>
                </li>
                <li>
                  <Link to="/addDecant" className="hover:underline">
                    Agregar Decant
                  </Link>
                </li>
                <li>
                  <Link to="/transfers" className="hover:underline">
                    Transferencias
                  </Link>
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
                  <Link to="/ventas" className="hover:underline">
                    Lista de Ventas
                  </Link>
                </li>
                <li>
                  <Link to="/clientes" className="hover:underline">
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link to="/vendedores" className="hover:underline">
                    Vendedores
                  </Link>
                </li>
                <li>
                  <Link to="/proveedores" className="hover:underline">
                    Proveedores
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <button className="fixed top-4 left-4 text-white text-3xl lg:hidden z-50" onClick={toggleSidebar}>
        <FiMenu />
      </button>
    </div>
  );
};

export default Navbar;