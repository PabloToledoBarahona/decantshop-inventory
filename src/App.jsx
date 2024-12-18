import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PerfumeList from './components/PerfumeList';
import AddPerfumeForm from './components/AddPerfumeForm';
import DecantList from './components/DecantList';
import AddDecantForm from './components/AddDecantForm';
import InventorySummary from './components/InventorySummary';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Cambiado a 'home' como página inicial

  // Función para actualizar perfumes si es necesario
  const refreshPerfumes = () => {
    console.log('Perfumes actualizados');
  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} refreshPerfumes={refreshPerfumes} />
      <div className="p-6">
        {currentPage === 'home' && <InventorySummary />} {/* Mostrar resumen en la página inicial */}
        {currentPage === 'list' && <PerfumeList />}
        {currentPage === 'add' && <AddPerfumeForm />}
        {currentPage === 'decants' && <DecantList />}
        {currentPage === 'addDecant' && <AddDecantForm onAdd={() => setCurrentPage('decants')} />}
      </div>
    </div>
  );
};

export default App;