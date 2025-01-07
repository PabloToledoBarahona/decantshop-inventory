import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Importar la URL base

const AddDecantForm = ({ onAdd }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [formData, setFormData] = useState({
    perfume_id: '',
    cantidad_ml: '',
    maleta_destino: '',
    cantidad_decants: 1, // Nuevo campo para indicar cuántos decants agregar
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Obtener la lista de perfumes disponibles
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/perfumes`);
        setPerfumes(response.data);
      } catch (error) {
        console.error('❌ Error al obtener perfumes:', error);
        setError('Error al obtener la lista de perfumes. Intente nuevamente.');
      }
    };
    fetchPerfumes();
  }, []);

  // ✅ Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = {
        perfume_id: formData.perfume_id,
        cantidad: formData.cantidad_ml,
        maleta_destino: formData.maleta_destino,
        cantidad_decants: formData.cantidad_decants,
      };

      await axios.post(`${API_BASE_URL}/decants`, payload);
      setSuccess(`✅ ¡Se han agregado ${formData.cantidad_decants} decants correctamente!`);
      onAdd();

      // ✅ Reiniciar el formulario
      setFormData({
        perfume_id: '',
        cantidad_ml: '',
        maleta_destino: '',
        cantidad_decants: 1,
      });
    } catch (error) {
      console.error('❌ Error al agregar decant:', error);

      if (error.response?.status === 400) {
        setError(error.response.data || '❌ Error al agregar decants: Datos inválidos.');
      } else if (error.response?.status === 404) {
        setError('❌ El perfume seleccionado no existe.');
      } else if (error.response?.status === 500) {
        setError('❌ Error en el servidor. Intente nuevamente más tarde.');
      } else {
        setError('❌ Error desconocido al agregar decants.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo Decant</h2>

      {/* ✅ Mostrar errores */}
      {error && (
        <div className="mb-4 p-3 bg-red-200 border-l-4 border-red-500 text-red-800 rounded">
          {error}
        </div>
      )}

      {/* ✅ Mostrar éxito */}
      {success && (
        <div className="mb-4 p-3 bg-green-200 border-l-4 border-green-500 text-green-800 rounded">
          {success}
        </div>
      )}

      {/* ✅ Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Lista desplegable de Perfumes */}
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

        {/* ✅ Cantidad de ML por Decant */}
        <div>
          <label className="block mb-1 font-semibold">Contenido (ml por decant):</label>
          <input
            type="number"
            name="cantidad_ml"
            value={formData.cantidad_ml}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
            min="1"
          />
        </div>

        {/* ✅ Cantidad de Decants */}
        <div>
          <label className="block mb-1 font-semibold">Cantidad de Decants:</label>
          <input
            type="number"
            name="cantidad_decants"
            value={formData.cantidad_decants}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
            min="1"
          />
        </div>

        {/* ✅ Maleta de Destino */}
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

        {/* ✅ Botón de envío */}
        <button
          type="submit"
          className="w-full bg-white text-gray-800 font-semibold p-2 rounded hover:bg-gray-300 transition duration-300"
        >
          Agregar Decants
        </button>
      </form>
    </div>
  );
};

export default AddDecantForm;