import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:3000/api/perfumes');
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
      await axios.post('http://localhost:3000/api/decants', formData);
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
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Agregar Decant</h2>
      
      <div>
        <label>Perfume:</label>
        <select
          name="perfume_id"
          value={formData.perfume_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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
        <label>Cantidad (ml):</label>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="1"
        />
      </div>

      <div>
        <label>Maleta Destino:</label>
        <select
          name="maleta_destino"
          value={formData.maleta_destino}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione una maleta</option>
          <option value="Pablo">Pablo</option>
          <option value="Jose Carlos">Jose Carlos</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Agregar Decant
      </button>
    </form>
  );
};

export default AddDecantForm;