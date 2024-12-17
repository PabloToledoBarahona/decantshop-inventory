import React, { useState } from 'react';
import PerfumeList from './components/PerfumeList';
import AddPerfume from './components/AddPerfume';
import Navbar from './components/Navbar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('list');

  const renderPage = () => {
    if (currentPage === 'list') return <PerfumeList />;
    if (currentPage === 'add') return <AddPerfume />;
    return null;
  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="container mx-auto p-4">{renderPage()}</div>
    </div>
  );
};

export default App;