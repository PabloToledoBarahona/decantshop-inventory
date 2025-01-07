import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';
import axios from 'axios';

const DecantList = () => {
  const [decants, setDecants] = useState([]);
  const [filterMaleta, setFilterMaleta] = useState(''); // Filtro de maleta
  const [filterPerfume, setFilterPerfume] = useState(''); // Filtro de perfume
  const [uniquePerfumes, setUniquePerfumes] = useState([]); // Lista de perfumes únicos

  // ✅ Obtener la lista de decants (con detalles del perfume)
  const fetchDecants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/decants`);
      setDecants(response.data || []);

      // Extraer nombres únicos de perfumes para los filtros
      const perfumes = Array.from(
        new Set(response.data.map((decant) => decant.perfume?.name))
      ).filter(Boolean);
      setUniquePerfumes(perfumes);
    } catch (error) {
      console.error('❌ Error al obtener decants:', error);
    }
  };

  useEffect(() => {
    fetchDecants();
  }, []);

  // ✅ Manejar filtro por maleta
  const handleFilterMaletaChange = (event) => {
    setFilterMaleta(event.target.value);
  };

  // ✅ Manejar filtro por perfume
  const handleFilterPerfumeChange = (event) => {
    setFilterPerfume(event.target.value);
  };

  // ✅ Eliminar un decant
  const handleDeleteDecant = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/decants/${id}`);
      fetchDecants(); // Actualizar lista después de eliminar
    } catch (error) {
      console.error('❌ Error al eliminar decant:', error);
    }
  };

  // ✅ Aplicar filtros combinados
  const filteredDecants = decants.filter((decant) => {
    const matchesMaleta = filterMaleta
      ? decant.maleta_destino === filterMaleta
      : true;
    const matchesPerfume = filterPerfume
      ? decant.perfume?.name === filterPerfume
      : true;

    return matchesMaleta && matchesPerfume;
  });

  // ✅ Agrupar decants por perfume
  const groupedDecants = filteredDecants.reduce((acc, decant) => {
    const perfumeName = decant.perfume?.name || 'Perfume Desconocido';
    if (!acc[perfumeName]) {
      acc[perfumeName] = {
        id: decant.id,
        name: perfumeName,
        maleta: decant.maleta_destino,
        cantidad: 1,
        contenido: decant.cantidad,
      };
    } else {
      acc[perfumeName].cantidad += 1;
      acc[perfumeName].contenido += decant.cantidad;
    }
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-800 text-white rounded-lg shadow-md">
      <header className="mb-6">
        <h2 className="text-3xl font-bold mb-2 text-center">Lista de Decants</h2>
        <p className="text-gray-400 text-center">
          Administra los decants y filtra por maletas y perfumes según tus necesidades.
        </p>
      </header>

      {/* 🛠️ Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro por Maleta */}
        <div>
          <label className="text-gray-400 font-medium block mb-1">Filtrar por maleta:</label>
          <select
            value={filterMaleta}
            onChange={handleFilterMaletaChange}
            className="w-full p-2 border rounded-lg text-black"
          >
            <option value="">Todas</option>
            <option value="Pablo">Pablo</option>
            <option value="Jose Carlos">Jose Carlos</option>
          </select>
        </div>

        {/* Filtro por Perfume */}
        <div>
          <label className="text-gray-400 font-medium block mb-1">Filtrar por perfume:</label>
          <select
            value={filterPerfume}
            onChange={handleFilterPerfumeChange}
            className="w-full p-2 border rounded-lg text-black"
          >
            <option value="">Todos</option>
            {uniquePerfumes.map((perfume, index) => (
              <option key={index} value={perfume}>
                {perfume}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📝 Lista de Decants Agrupados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(groupedDecants).map((decant) => (
          <div
            key={decant.id}
            className="p-4 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{decant.name}</h3>
            <div className="text-sm">
              <p>
                <span className="font-medium">Cantidad:</span> {decant.cantidad}
              </p>
              <p>
                <span className="font-medium">Contenido:</span> {decant.contenido} ml
              </p>
              <p>
                <span className="font-medium">Maleta:</span> {decant.maleta}
              </p>
            </div>
            <button
              onClick={() => handleDeleteDecant(decant.id)}
              className="mt-4 w-full bg-red-500 text-white font-medium p-2 rounded-lg hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Sin Resultados */}
      {Object.keys(groupedDecants).length === 0 && (
        <div className="mt-6 text-center text-gray-400">
          <p>No se encontraron decants con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};

export default DecantList;