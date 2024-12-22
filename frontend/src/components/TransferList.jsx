import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config"; // Importar la URL base
import axios from "axios";

const TransferList = () => {
  const [transfers, setTransfers] = useState([]);
  const [decants, setDecants] = useState([]);
  const [newTransfer, setNewTransfer] = useState({
    decants: [], // Array para múltiples decants
    origen: "",
    destino: "",
  });
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransfers();
    fetchStats();
    fetchDecants();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transfers`);
      setTransfers(response.data || []);
    } catch (error) {
      console.error("Error al obtener transferencias:", error);
      setError("No se pudieron obtener las transferencias.");
    }
  };
  
  // Fetch estadísticas
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transfers/stats`);
      setStats(response.data || {});
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      setError("No se pudieron obtener las estadísticas.");
    }
  };

  // Fetch decants
  const fetchDecants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/decants`);
      setDecants(response.data);
    } catch (error) {
      console.error("Error al obtener decants:", error);
    }
  };

  const handleDecantSelection = (id) => {
    setNewTransfer((prev) => {
      const alreadySelected = prev.decants.includes(id);
      return {
        ...prev,
        decants: alreadySelected
          ? prev.decants.filter((decantId) => decantId !== id)
          : [...prev.decants, id],
      };
    });
  };

  const handleChange = (e) => {
    setNewTransfer({
      ...newTransfer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newTransfer.decants.length === 0) {
        alert("Seleccione al menos un decant para transferir.");
        return;
      }

      // Formatear datos para el backend
      const payload = {
        decant_ids: newTransfer.decants,
        origen: newTransfer.origen,
        destino: newTransfer.destino,
        fecha: new Date().toISOString(), // Opción para enviar la fecha actual
      };

      // Enviar transferencia al backend
      await axios.post(`${API_BASE_URL}/transfers`, payload);
      setNewTransfer({ decants: [], origen: "", destino: "" });
      fetchTransfers();
      fetchStats();
    } catch (error) {
      console.error("Error al realizar la transferencia:", error);
      alert("Hubo un error al realizar la transferencia.");
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Dashboard de Transferencias
      </h2>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Total Transferencias</p>
            <p className="text-2xl font-bold text-blue-400">
              {stats.totalTransfers}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Transferencias desde Pablo</p>
            <p className="text-2xl font-bold text-green-400">
              {stats.fromPablo}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Transferencias desde Jose Carlos</p>
            <p className="text-2xl font-bold text-green-400">
              {stats.fromJoseCarlos}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Última Transferencia</p>
            <p className="text-2xl font-bold text-red-400">
              {stats.lastTransferDate
                ? new Date(stats.lastTransferDate).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Formulario para crear transferencias */}
      <div className="bg-gray-700 p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Realizar Nueva Transferencia
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="font-semibold mb-2">Seleccionar Decants:</p>
            <div className="grid grid-cols-2 gap-2">
              {decants.map((decant) => (
                <label key={decant.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={decant.id}
                    checked={newTransfer.decants.includes(decant.id)}
                    onChange={() => handleDecantSelection(decant.id)}
                  />
                  <span>
                    {decant.id} -{" "}
                    {decant.perfume ? decant.perfume.name : "Desconocido"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <select
            name="origen"
            value={newTransfer.origen}
            onChange={handleChange}
            className="p-2 rounded border text-gray-800"
            required
          >
            <option value="" className="text-gray-600">
              Seleccione la Maleta de Origen
            </option>
            <option value="Pablo">Pablo</option>
            <option value="Jose Carlos">Jose Carlos</option>
          </select>

          <select
            name="destino"
            value={newTransfer.destino}
            onChange={handleChange}
            className="p-2 rounded border text-gray-800"
            required
          >
            <option value="" className="text-gray-600">
              Seleccione la Maleta de Destino
            </option>
            <option value="Pablo">Pablo</option>
            <option value="Jose Carlos">Jose Carlos</option>
          </select>

          <button
            type="submit"
            className="p-2 bg-white text-gray-800 rounded hover:bg-gray-100 transition duration-300"
          >
            Realizar Transferencia
          </button>
        </form>
      </div>

      {/* Tabla de transferencias */}
      <table className="w-full border-collapse bg-gray-700 text-sm text-left">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">ID Decant</th>
            <th className="px-4 py-2">Perfume</th>
            <th className="px-4 py-2">Origen</th>
            <th className="px-4 py-2">Destino</th>
            <th className="px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr
              key={transfer.id}
              className="border-t border-gray-600 hover:bg-gray-700"
            >
              <td className="px-4 py-2">{transfer.id}</td>
              <td className="px-4 py-2">{transfer.decant_id}</td>
              <td className="px-4 py-2">
                {transfer.decant && transfer.decant.perfume
                  ? transfer.decant.perfume.name
                  : "Desconocido"}
              </td>
              <td className="px-4 py-2">{transfer.origen}</td>
              <td className="px-4 py-2">{transfer.destino}</td>
              <td className="px-4 py-2">
                {new Date(transfer.fecha).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransferList;
