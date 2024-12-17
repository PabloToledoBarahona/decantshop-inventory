import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);

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

  return (
    <div>
      <h1>Lista de Perfumes</h1>
      <ul>
        {perfumes.map((perfume) => (
          <li key={perfume.id}>
            {perfume.name} - {perfume.remaining_ml} ml restantes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerfumeList;