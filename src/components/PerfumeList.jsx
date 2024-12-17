import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditPerfumeForm from './EditPerfumeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [editingPerfumeId, setEditingPerfumeId] = useState(null);

  // Obtener la lista de perfumes
  const fetchPerfumes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perfumes');
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
        await axios.delete(`http://localhost:3000/api/perfumes/${id}`);
        fetchPerfumes();
      } catch (error) {
        console.error('Error al eliminar perfume:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Perfumes</h2>
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
        <ul className="space-y-4">
          {perfumes.map((perfume) => (
            <li
              key={perfume.id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{perfume.name}</p>
                <p>Total ML: {perfume.total_ml}</p>
                <p>ML Restantes: {perfume.remaining_ml}</p>
                <p>
                  Estado:{' '}
                  <span
                    className={
                      perfume.status === 'Disponible' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {perfume.status}
                  </span>
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditClick(perfume.id)}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteClick(perfume.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} />
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