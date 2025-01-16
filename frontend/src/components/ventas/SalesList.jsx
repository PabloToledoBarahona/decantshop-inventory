import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('/api/ventas');
        setSales(response.data);
      } catch (err) {
        setError('Error al cargar las ventas');
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Ventas</h1>
      <Link to="/ventas/nueva" className="btn btn-primary">
        Registrar Nueva Venta
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Monto Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.cliente.nombre_completo}</td>
              <td>{new Date(sale.fecha).toLocaleDateString()}</td>
              <td>{sale.monto_total} Bs</td>
              <td>{sale.estado}</td>
              <td>
                <Link to={`/ventas/${sale.id}`} className="btn btn-info btn-sm">
                  Ver Detalles
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;