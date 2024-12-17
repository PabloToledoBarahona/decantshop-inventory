import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventorySummary = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perfumes/resumen');
      setSummary(response.data);
    } catch (error) {
      console.error('Error al obtener el resumen del inventario:', error);
      setError('No se pudo obtener el resumen del inventario.');
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!summary) {
    return <p className="text-gray-500 text-center">Cargando resumen...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Resumen del Inventario</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold">Total de Perfumes</p>
          <p className="text-2xl font-bold text-blue-500">{summary.totalPerfumes}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold">Total de ML Restantes</p>
          <p className="text-2xl font-bold text-green-500">{summary.totalMlRestantes} ml</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold">Perfumes Disponibles</p>
          <p className="text-2xl font-bold text-green-500">{summary.perfumesDisponibles}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="font-semibold">Perfumes No Disponibles</p>
          <p className="text-2xl font-bold text-red-500">{summary.perfumesNoDisponibles}</p>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;