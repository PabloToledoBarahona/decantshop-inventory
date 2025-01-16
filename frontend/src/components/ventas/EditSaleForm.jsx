import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSaleForm = ({ saleId, onSaleUpdated }) => {
  const [sale, setSale] = useState(null);
  const [montoPagado, setMontoPagado] = useState('');

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(`/api/ventas/${saleId}`);
        setSale(response.data);
        setMontoPagado(response.data.monto_pagado || 0);
      } catch (error) {
        console.error('Error al cargar la venta:', error);
      }
    };

    fetchSale();
  }, [saleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/ventas/${saleId}`, {
        monto_pagado: montoPagado,
      });
      onSaleUpdated(response.data);
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
    }
  };

  if (!sale) return <p>Cargando venta...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Venta</h1>
      <div>
        <label>Monto Total:</label>
        <p>{sale.monto_total} Bs</p>
      </div>
      <div>
        <label>Monto Pagado:</label>
        <input
          type="number"
          value={montoPagado}
          onChange={(e) => setMontoPagado(e.target.value)}
          max={sale.monto_total}
        />
      </div>
      <button type="submit">Actualizar Venta</button>
    </form>
  );
};

export default EditSaleForm;