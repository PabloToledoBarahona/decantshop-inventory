import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SaleDetail = ({ saleId }) => {
  const [sale, setSale] = useState(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(`/api/ventas/${saleId}`);
        setSale(response.data);
      } catch (error) {
        console.error('Error al cargar la venta:', error);
      }
    };

    fetchSale();
  }, [saleId]);

  if (!sale) return <p>Cargando detalles...</p>;

  return (
    <div>
      <h1>Detalles de la Venta</h1>
      <p>Cliente: {sale.cliente.nombre_completo}</p>
      <p>Fecha: {new Date(sale.fecha).toLocaleDateString()}</p>
      <p>Monto Total: {sale.monto_total} Bs</p>
      <p>Estado: {sale.estado}</p>
      <h2>Decants:</h2>
      <ul>
        {sale.decants.map((decant) => (
          <li key={decant.id}>
            {decant.nombre} - {decant.cantidad} unidades
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaleDetail;