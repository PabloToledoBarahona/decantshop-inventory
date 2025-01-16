import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
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
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-6">
        <Routes>
          {/* Inventario */}
          <Route path="/" element={<InventorySummary />} />
          <Route path="/list" element={<PerfumeList />} />
          <Route path="/add" element={<AddPerfumeForm />} />
          <Route path="/decants" element={<DecantList />} />
          <Route path="/addDecant" element={<AddDecantForm />} />
          <Route path="/transfers" element={<TransferList />} />

          {/* Ventas */}
          <Route path="/ventas" element={<SalesList />} />
          <Route path="/clientes" element={<ClientsList />} />
          <Route path="/vendedores" element={<SellersList />} />
          <Route path="/proveedores" element={<SuppliersList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;