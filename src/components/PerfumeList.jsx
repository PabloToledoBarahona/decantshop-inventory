import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Importar la URL base
import EditPerfumeForm from './EditPerfumeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [editingPerfumeId, setEditingPerfumeId] = useState(null);

  // Obtener la lista de perfumes
  const fetchPerfumes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/perfumes`);
      setPerfumes(response.data);
    } catch (error) {
      console.error('Error al obtener perfumes:', error);
    }
  };

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const handleEditClick = (id) => {
    setEditingPerfumeId(id);
  };

  const handleCancelEdit = () => {
    setEditingPerfumeId(null);
  };

  // Eliminar un perfume
  const handleDeleteClick = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este perfume?')) {
      try {
        await axios.delete(`${API_BASE_URL}/perfumes/${id}`);
        fetchPerfumes();
      } catch (error) {
        console.error('Error al eliminar perfume:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Lista de Perfumes</h2>
        <p className="text-gray-600">Gestiona la lista de perfumes de tu inventario.</p>
      </header>
      
      {editingPerfumeId ? (
        <EditPerfumeForm
          perfumeId={editingPerfumeId}
          onUpdate={() => {
            fetchPerfumes();
            setEditingPerfumeId(null);
          }}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perfumes.map((perfume) => (
            <li
              key={perfume.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{perfume.name}</h3>
                <div className="text-sm text-gray-600">
                  <p>Total ML: <span className="font-medium">{perfume.total_ml}</span></p>
                  <p>ML Restantes: <span className="font-medium">{perfume.remaining_ml}</span></p>
                  <p>
                    Estado:{' '}
                    <span
                      className={`font-medium ${
                        perfume.status === 'Disponible'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {perfume.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => handleEditClick(perfume.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-md flex items-center shadow"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteClick(perfume.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md flex items-center shadow"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" />
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PerfumeList;