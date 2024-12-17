import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DecantList = () => {
  const [decants, setDecants] = useState([]);
  const [filterMaleta, setFilterMaleta] = useState(''); // Filtro de maleta

  // Obtener la lista de decants (con detalles del perfume)
  const fetchDecants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/decants');
      setDecants(response.data);
    } catch (error) {
      console.error('Error al obtener decants:', error);
    }
  };

  useEffect(() => {
    fetchDecants();
  }, []);

  // Filtrar decants por maleta
  const handleFilterChange = (event) => {
    setFilterMaleta(event.target.value);
  };

  const filteredDecants = decants.filter((decant) =>
    filterMaleta ? decant.maleta_destino === filterMaleta : true
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Decants</h2>
      
      {/* Filtro de maletas */}
      <div className="mb-4">
        <label className="mr-2">Filtrar por maleta:</label>
        <select
          value={filterMaleta}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">Todas</option>
          <option value="Pablo">Pablo</option>
          <option value="Jose Carlos">Jose Carlos</option>
        </select>
      </div>

      {/* Lista de decants */}
      <ul className="space-y-4">
        {filteredDecants.map((decant) => (
          <li
            key={decant.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-bold">
                Perfume: {decant.perfume ? decant.perfume.name : 'Desconocido'}
              </p>
              <p>Cantidad: {decant.cantidad} ml</p>
              <p>Maleta: {decant.maleta_destino}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DecantList;