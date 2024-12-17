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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo Perfume</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre del Perfume"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="total_ml"
          placeholder="Total ML"
          value={formData.total_ml}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="remaining_ml"
          placeholder="Remaining ML"
          value={formData.remaining_ml}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Agregar Perfume
        </button>
      </form>
    </div>
  );
};

export default AddPerfume;