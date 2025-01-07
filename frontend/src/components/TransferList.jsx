import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import axios from "axios";

const TransferList = () => {
  const [transfers, setTransfers] = useState([]);
  const [decants, setDecants] = useState([]);
  const [filteredDecants, setFilteredDecants] = useState([]);
  const [newTransfer, setNewTransfer] = useState({
    decants: [],
    origen: "",
    destino: "",
  });
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchTransfers();
    fetchStats();
    fetchDecants();
  }, []);

  // ✅ Obtener transferencias
  const fetchTransfers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transfers`);
      setTransfers(response.data || []);
    } catch (error) {
      console.error("❌ Error al obtener transferencias:", error);
      setError("No se pudieron obtener las transferencias.");
    }
  };

  // ✅ Obtener estadísticas
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transfers/stats`);
      setStats(response.data || {});
    } catch (error) {
      console.error("❌ Error al obtener estadísticas:", error);
      setError("No se pudieron obtener las estadísticas.");
    }
  };

  // ✅ Obtener decants
  const fetchDecants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/decants`);
      setDecants(response.data || []);
    } catch (error) {
      console.error("❌ Error al obtener decants:", error);
    }
  };

  // ✅ Filtrar decants por origen
  useEffect(() => {
    if (newTransfer.origen) {
      const filtered = decants.filter(
        (decant) => decant.maleta_destino === newTransfer.origen
      );
      setFilteredDecants(filtered);
      setNewTransfer((prev) => ({ ...prev, decants: [] }));
    } else {
      setFilteredDecants([]);
    }
  }, [newTransfer.origen, decants]);

  // ✅ Seleccionar decants
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

  // ✅ Manejar cambios en formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransfer((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "origen" && { destino: "" }), // Reiniciar destino si cambia origen
    }));
  };

  // ✅ Enviar transferencia
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (newTransfer.decants.length === 0) {
        setError("Seleccione al menos un decant para transferir.");
        return;
      }
      if (newTransfer.origen === newTransfer.destino) {
        setError("El origen y destino no pueden ser iguales.");
        return;
      }

      const payload = {
        decant_ids: newTransfer.decants,
        origen: newTransfer.origen,
        destino: newTransfer.destino,
        fecha: new Date().toISOString(),
      };

      await axios.post(`${API_BASE_URL}/transfers`, payload);
      setSuccess("Transferencia realizada exitosamente.");
      setNewTransfer({ decants: [], origen: "", destino: "" });
      fetchTransfers();
      fetchStats();
    } catch (error) {
      console.error("❌ Error al realizar la transferencia:", error);
      setError("Hubo un error al realizar la transferencia.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Transferencias</h2>

      {/* ✅ Mensajes */}
      {error && (
        <p className="text-red-400 mb-4 text-center border border-red-400 bg-red-50 rounded-lg p-2 text-red-700">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-400 mb-4 text-center border border-green-400 bg-green-50 rounded-lg p-2 text-green-700">
          {success}
        </p>
      )}

      {/* ✅ Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="font-semibold">Total Transferencias</p>
            <p className="text-xl font-bold">{stats.totalTransfers}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="font-semibold">Desde Pablo</p>
            <p className="text-xl font-bold">{stats.fromPablo}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="font-semibold">Desde Jose Carlos</p>
            <p className="text-xl font-bold">{stats.fromJoseCarlos}</p>
          </div>
        </div>
      )}

      {/* ✅ Formulario */}
      <div className="bg-gray-700 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Realizar Nueva Transferencia</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Origen</label>
            <select
              name="origen"
              value={newTransfer.origen}
              onChange={handleChange}
              required
              className="w-full p-2 text-black rounded"
            >
              <option value="">Seleccione Origen</option>
              <option value="Pablo">Pablo</option>
              <option value="Jose Carlos">Jose Carlos</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Destino</label>
            <select
              name="destino"
              value={newTransfer.destino}
              onChange={handleChange}
              required
              className="w-full p-2 text-black rounded"
            >
              <option value="">Seleccione Destino</option>
              {newTransfer.origen !== "Pablo" && <option value="Pablo">Pablo</option>}
              {newTransfer.origen !== "Jose Carlos" && <option value="Jose Carlos">Jose Carlos</option>}
            </select>
          </div>

          <div>
            <label className="block mb-2">Seleccionar Decants</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {filteredDecants.map((decant) => (
                <label key={decant.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handleDecantSelection(decant.id)}
                    checked={newTransfer.decants.includes(decant.id)}
                  />
                  <span>
                    {decant.perfume?.name} - {decant.cantidad}ml
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Realizar Transferencia
          </button>
        </form>
      </div>

      {/* ✅ Botón de Historial */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full bg-gray-700 p-2 rounded-lg mb-4"
      >
        {showHistory ? "Ocultar Historial de Transferencias" : "Mostrar Historial de Transferencias"}
      </button>

      {/* ✅ Historial de Transferencias */}
      {showHistory && (
        <div className="overflow-x-auto bg-gray-700 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-center">Historial de Transferencias</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Origen</th>
                <th className="px-4 py-2">Destino</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Decants</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-t border-gray-600 hover:bg-gray-800">
                  <td className="px-4 py-2">{transfer.id}</td>
                  <td className="px-4 py-2 text-black bg-white">{transfer.origen}</td>
                  <td className="px-4 py-2 text-black bg-white">{transfer.destino}</td>
                  <td className="px-4 py-2">{new Date(transfer.fecha).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    {transfer.decant?.perfume?.name || "Desconocido"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransferList;