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

  return (
    <div className="p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Lista de Decants</h2>
        <p className="text-gray-600">
          Administra los decants y filtra por maletas y perfumes según tus necesidades.
        </p>
      </header>

      {/* Filtros */}
      <div className="mb-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Filtro por Maleta */}
        <div>
          <label className="text-gray-700 font-medium">Filtrar por maleta:</label>
          <select
            value={filterMaleta}
            onChange={handleFilterMaletaChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Todas</option>
            <option value="Pablo">Pablo</option>
            <option value="Jose Carlos">Jose Carlos</option>
          </select>
        </div>

        {/* Filtro por Perfume */}
        <div>
          <label className="text-gray-700 font-medium">Filtrar por perfume:</label>
          <select
            value={filterPerfume}
            onChange={handleFilterPerfumeChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
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

      {/* Lista de Decants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecants.map((decant) => (
          <div
            key={decant.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {decant.perfume ? decant.perfume.name : 'Perfume Desconocido'}
            </h3>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Cantidad:</span> {decant.cantidad} ml
              </p>
              <p>
                <span className="font-medium">Maleta:</span> {decant.maleta_destino}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sin Resultados */}
      {filteredDecants.length === 0 && (
        <div className="mt-6 text-center text-gray-600">
          <p>No se encontraron decants con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};

export default DecantList;