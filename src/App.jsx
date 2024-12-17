import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PerfumeList from './components/PerfumeList';
import AddPerfume from './components/AddPerfume';

const App = () => {
  const [currentPage, setCurrentPage] = useState('list'); // Estado inicial

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar recibe setCurrentPage como prop */}
      <Navbar setCurrentPage={setCurrentPage} />

      <div className="container mx-auto p-4">
        {currentPage === 'list' && <PerfumeList/>}
        {currentPage === 'add' && <AddPerfume/>}
      </div>
    </div>
  );
};

export default App;