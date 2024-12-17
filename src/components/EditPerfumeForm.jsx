import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:3000/api/perfumes/${perfumeId}`);
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
      await axios.put(`http://localhost:3000/api/perfumes/${perfumeId}`, formData);
      onUpdate(); // Actualizar la lista después de la edición
    } catch (error) {
      console.error('Error al actualizar el perfume:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Editar Perfume</h2>

      <label className="block mb-2">
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Total ML:
        <input
          type="number"
          name="total_ml"
          value={formData.total_ml}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        ML Restantes:
        <input
          type="number"
          name="remaining_ml"
          value={formData.remaining_ml}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Estado:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>
      </label>

      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Guardar Cambios
        </button>
        <button type="button" onClick={onCancel} className="bg-red-500 text-white p-2 rounded">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditPerfumeForm;