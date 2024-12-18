import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Importar la URL base

const AddDecantForm = ({ onAdd }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [formData, setFormData] = useState({
    perfume_id: '',
    cantidad: '',
    maleta_destino: '',
  });

  // Obtener la lista de perfumes disponibles
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/perfumes`);
        setPerfumes(response.data);
      } catch (error) {
        console.error('Error al obtener perfumes:', error);
      }
    };
    fetchPerfumes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/decants`, formData);
      onAdd();
      setFormData({
        perfume_id: '',
        cantidad: '',
        maleta_destino: '',
      });
    } catch (error) {
      console.error('Error al agregar decant:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo Decant</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lista desplegable */}
        <div>
          <label className="block mb-1 font-semibold">Perfume:</label>
          <select
            name="perfume_id"
            value={formData.perfume_id}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          >
            <option value="">Seleccione un perfume</option>
            {perfumes.map((perfume) => (
              <option key={perfume.id} value={perfume.id}>
                {perfume.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cantidad (ml):</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Maleta Destino:</label>
          <select
            name="maleta_destino"
            value={formData.maleta_destino}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          >
            <option value="">Seleccione una maleta</option>
            <option value="Pablo">Pablo</option>
            <option value="Jose Carlos">Jose Carlos</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-gray-800 font-semibold p-2 rounded hover:bg-gray-300 transition duration-300"
        >
          Agregar Decant
        </button>
      </form>
    </div>
  );
};

export default AddDecantForm;