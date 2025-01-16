import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellersList = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('/api/vendedores');
        setSellers(response.data);
      } catch (err) {
        setError('Error al cargar los vendedores');
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);

  if (loading) return <p>Cargando vendedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Vendedores</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.id}</td>
              <td>{seller.nombre_completo}</td>
              <td>{seller.numero_celular}</td>
              <td>{seller.correo || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellersList;