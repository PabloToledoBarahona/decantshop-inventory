import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const EditPerfumeForm = ({ perfumeId, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    total_ml: '',
    remaining_ml: '',
    status: '',
  });

  // Cargar los datos del perfume al cargar el componente
  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/perfumes/${perfumeId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener el perfume:', error);
      }
    };

    fetchPerfume();
  }, [perfumeId]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar los cambios al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/perfumes/${perfumeId}`, formData);
      onUpdate(); // Actualizar la lista después de la edición
    } catch (error) {
      console.error('Error al actualizar el perfume:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Perfume</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Total ML:</label>
          <input
            type="number"
            name="total_ml"
            value={formData.total_ml}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">ML Restantes:</label>
          <input
            type="number"
            name="remaining_ml"
            value={formData.remaining_ml}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Estado:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="Disponible">Disponible</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-white text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPerfumeForm;