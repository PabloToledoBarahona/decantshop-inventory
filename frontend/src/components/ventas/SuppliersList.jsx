import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/proveedores');
        setSuppliers(response.data);
      } catch (err) {
        setError('Error al cargar los proveedores');
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  if (loading) return <p>Cargando proveedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Proveedores</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.nombre_proveedor}</td>
              <td>{supplier.numero_contacto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersList;