import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSaleForm = ({ onSaleCreated }) => {
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [decants, setDecants] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedVendedor, setSelectedVendedor] = useState('');
  const [selectedDecants, setSelectedDecants] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [detalles, setDetalles] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, vendedoresRes, decantsRes] = await Promise.all([
          axios.get('/api/clientes'),
          axios.get('/api/vendedores'),
          axios.get('/api/decants'),
        ]);

        setClientes(clientesRes.data);
        setVendedores(vendedoresRes.data);
        setDecants(decantsRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/ventas', {
        cliente_id: selectedCliente,
        vendedor_id: selectedVendedor,
        decants: selectedDecants,
        monto_total: montoTotal,
        detalles,
      });
      onSaleCreated(response.data);
    } catch (error) {
      console.error('Error al registrar venta:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrar Venta</h1>
      <div>
        <label>Cliente:</label>
        <select
          value={selectedCliente}
          onChange={(e) => setSelectedCliente(e.target.value)}
          required
        >
          <option value="">Seleccionar cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre_completo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Vendedor:</label>
        <select
          value={selectedVendedor}
          onChange={(e) => setSelectedVendedor(e.target.value)}
          required
        >
          <option value="">Seleccionar vendedor</option>
          {vendedores.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nombre_completo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Decants:</label>
        {decants.map((decant) => (
          <div key={decant.id}>
            <input
              type="checkbox"
              value={decant.id}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDecants((prev) =>
                  e.target.checked
                    ? [...prev, value]
                    : prev.filter((id) => id !== value)
                );
              }}
            />
            {decant.nombre} ({decant.cantidad} disponibles)
          </div>
        ))}
      </div>
      <div>
        <label>Monto Total:</label>
        <input
          type="number"
          value={montoTotal}
          onChange={(e) => setMontoTotal(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Detalles:</label>
        <textarea
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
        />
      </div>
      <button type="submit">Registrar Venta</button>
    </form>
  );
};

export default AddSaleForm;