import React, { useState } from 'react';
import axios from 'axios';

const AddPerfume = () => {
  const [formData, setFormData] = useState({
    name: '',
    total_ml: '',
    remaining_ml: '',
    status: 'Disponible',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validaciones simples
      if (!formData.name || !formData.total_ml || !formData.remaining_ml) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      if (formData.total_ml <= 0 || formData.remaining_ml < 0) {
        setError('Total ML debe ser mayor a 0 y Remaining ML no puede ser negativo.');
        return;
      }

      // Enviar los datos a la API
      await axios.post('http://localhost:3000/api/perfumes', formData);
      setSuccess('Perfume agregado exitosamente.');
      setFormData({
        name: '',
        total_ml: '',
        remaining_ml: '',
        status: 'Disponible',
      });
    } catch (error) {
      console.error('Error al agregar perfume:', error);
      setError('Hubo un error al agregar el perfume.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Agregar Nuevo Perfume</h2>
      {error && (
        <p className="text-red-400 mb-4 text-center border border-red-400 bg-red-50 rounded-lg p-2 text-red-700">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-400 mb-4 text-center border border-green-400 bg-green-50 rounded-lg p-2 text-green-700">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Nombre del Perfume</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border-b-2 bg-gray-800 border-gray-600 focus:outline-none focus:border-gray-400 text-white rounded"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Total ML</label>
          <input
            type="number"
            name="total_ml"
            value={formData.total_ml}
            onChange={handleChange}
            className="w-full p-3 border-b-2 bg-gray-800 border-gray-600 focus:outline-none focus:border-gray-400 text-white rounded"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">ML Restantes</label>
          <input
            type="number"
            name="remaining_ml"
            value={formData.remaining_ml}
            onChange={handleChange}
            className="w-full p-3 border-b-2 bg-gray-800 border-gray-600 focus:outline-none focus:border-gray-400 text-white rounded"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border-b-2 border-gray-600 focus:outline-none focus:border-gray-400 text-white rounded"
          >
            <option value="Disponible" className="bg-gray-700">Disponible</option>
            <option value="Agotado" className="bg-gray-700">Agotado</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-gray-800 font-semibold p-2 rounded hover:bg-gray-300 transition duration-300"
        >
          Agregar Perfume
        </button>
      </form>
    </div>
  );
};

export default AddPerfume;