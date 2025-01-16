import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";


const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Obtener la lista de clientes
  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clientes`);
      setClients(response.data || []);
    } catch (error) {
      console.error("❌ Error al obtener clientes:", error);
      setError("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Llamar a fetchClients al montar el componente
  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white text-black rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Nombre</th>
            <th className="border-b p-2">Teléfono</th>
            <th className="border-b p-2">Correo</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border-b p-2">{client.id}</td>
              <td className="border-b p-2">{client.nombre_completo}</td>
              <td className="border-b p-2">{client.numero_celular}</td>
              <td className="border-b p-2">{client.correo || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;