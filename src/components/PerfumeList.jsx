import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perfumes');
      setPerfumes(response.data);
    } catch (error) {
      console.error('Error al obtener perfumes:', error);
      setError('No se pudo obtener la lista de perfumes.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/perfumes/${id}`);
      // Actualizar la lista eliminando el perfume borrado
      setPerfumes(perfumes.filter((perfume) => perfume.id !== id));
    } catch (error) {
      console.error('Error al eliminar perfume:', error);
      setError('No se pudo eliminar el perfume.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Listado de Perfumes</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul>
        {perfumes.map((perfume) => (
          <li
            key={perfume.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div>
              <p className="font-semibold">{perfume.name}</p>
              <p>ML Totales: {perfume.total_ml}</p>
              <p>ML Restantes: {perfume.remaining_ml}</p>
              <p>
                Estado:{' '}
                <span
                  className={
                    perfume.status === 'Disponible'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {perfume.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(perfume.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerfumeList;