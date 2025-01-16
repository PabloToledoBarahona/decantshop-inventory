import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PerfumeList from './components/PerfumeList';
import AddPerfumeForm from './components/AddPerfumeForm';
import DecantList from './components/DecantList';
import AddDecantForm from './components/AddDecantForm';
import InventorySummary from './components/InventorySummary';
import TransferList from './components/TransferList';
import SalesList from './components/ventas/SalesList';
import ClientsList from './components/ventas/ClientsList';
import SellersList from './components/ventas/SellersList';
import SuppliersList from './components/ventas/SuppliersList';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Página inicial

  // Función para actualizar perfumes si es necesario
  const refreshPerfumes = () => {
    console.log('Perfumes actualizados');
  };

  return (
    <div className="flex">
  <Navbar setCurrentPage={setCurrentPage} refreshPerfumes={refreshPerfumes} />
  <div className="flex-1 p-6">
    {/* Inventario */}
    {currentPage === 'home' && <InventorySummary />}
    {currentPage === 'list' && <PerfumeList />}
    {currentPage === 'add' && <AddPerfumeForm />}
    {currentPage === 'decants' && <DecantList />}
    {currentPage === 'addDecant' && <AddDecantForm onAdd={() => setCurrentPage('decants')} />}
    {currentPage === 'transfers' && <TransferList />}

    {/* Ventas */}
    {currentPage === 'ventas' && <SalesList />}
    {currentPage === 'clientes' && <ClientsList />}
    {currentPage === 'vendedores' && <SellersList />}
    {currentPage === 'proveedores' && <SuppliersList />}
  </div>
</div>
  );
};

export default App;