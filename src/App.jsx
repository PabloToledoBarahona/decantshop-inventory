import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PerfumeList from './components/PerfumeList';
import AddPerfumeForm from './components/AddPerfumeForm';
import DecantList from './components/DecantList';
import AddDecantForm from './components/AddDecantForm';

const App = () => {
  const [currentPage, setCurrentPage] = useState('list');

  // Función para actualizar perfumes si es necesario
  const refreshPerfumes = () => {
    console.log('Perfumes actualizados');
  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} refreshPerfumes={refreshPerfumes} />
      <div className="p-6">
        {currentPage === 'list' && <PerfumeList />}
        {currentPage === 'add' && <AddPerfumeForm />}
        {currentPage === 'decants' && <DecantList />}
        {currentPage === 'addDecant' && <AddDecantForm onAdd={() => setCurrentPage('decants')} />}
      </div>
    </div>
  );
};

export default App;