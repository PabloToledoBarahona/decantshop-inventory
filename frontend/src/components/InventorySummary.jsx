import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import axios from "axios";

const InventorySummary = () => {
  const [perfumeSummary, setPerfumeSummary] = useState(null);
  const [decantSummary, setDecantSummary] = useState(null);
  const [transferSummary, setTransferSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      // ✅ Fetch resumen de perfumes
      const perfumeResponse = await axios.get(`${API_BASE_URL}/perfumes/resumen`);
      setPerfumeSummary(perfumeResponse.data || {});

      // ✅ Fetch resumen de decants
      const decantResponse = await axios.get(`${API_BASE_URL}/decants/resumen`);
      if (decantResponse.data) {
        setDecantSummary({
          totalDecants: decantResponse.data?.resumen?.[0]?.totalDecants || 0,
          totalMlEnDecants: decantResponse.data?.resumen?.[0]?.totalMlDecants || 0,
          decantsEnMaletaPablo:
            decantResponse.data?.porMaleta?.find(
              (item) => item.maleta_destino === "Pablo"
            )?.totalDecantsPorMaleta || 0,
          mlEnMaletaPablo:
            decantResponse.data?.porMaleta?.find(
              (item) => item.maleta_destino === "Pablo"
            )?.totalMlPorMaleta || 0,
          decantsEnMaletaJoseCarlos:
            decantResponse.data?.porMaleta?.find(
              (item) => item.maleta_destino === "Jose Carlos"
            )?.totalDecantsPorMaleta || 0,
          mlEnMaletaJoseCarlos:
            decantResponse.data?.porMaleta?.find(
              (item) => item.maleta_destino === "Jose Carlos"
            )?.totalMlPorMaleta || 0,
        });
      }

      // ✅ Fetch resumen de transferencias
      const transferResponse = await axios.get(`${API_BASE_URL}/transfers/stats`);
      setTransferSummary(transferResponse.data || {});
    } catch (error) {
      console.error("❌ Error al obtener los resúmenes:", error.response?.data || error.message);
      setError("No se pudieron obtener los resúmenes.");
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!perfumeSummary || !decantSummary || !transferSummary) {
    return <p className="text-gray-500 text-center">Cargando resúmenes...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Resumen del Inventario</h2>

      {/* Resumen de Perfumes */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Resumen de Perfumes</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Total de Perfumes</p>
            <p className="text-2xl font-bold text-blue-400">
              {perfumeSummary.totalPerfumes}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Total de ML Restantes</p>
            <p className="text-2xl font-bold text-green-400">
              {perfumeSummary.totalMlRestantes} ml
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Perfumes Disponibles</p>
            <p className="text-2xl font-bold text-green-400">
              {perfumeSummary.perfumesDisponibles}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Perfumes No Disponibles</p>
            <p className="text-2xl font-bold text-red-400">
              {perfumeSummary.perfumesNoDisponibles}
            </p>
          </div>
        </div>
      </div>

      {/* Resumen de Decants */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Resumen de Decants</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Total de Decants</p>
            <p className="text-2xl font-bold text-blue-400">
              {decantSummary.totalDecants}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Total de ML en Decants</p>
            <p className="text-2xl font-bold text-green-400">
              {decantSummary.totalMlEnDecants} ml
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Decants en Maleta Pablo</p>
            <p className="text-2xl font-bold text-blue-400">
              {decantSummary.decantsEnMaletaPablo}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Decants en Maleta Jose Carlos</p>
            <p className="text-2xl font-bold text-blue-400">
              {decantSummary.decantsEnMaletaJoseCarlos}
            </p>
          </div>
        </div>
      </div>

      {/* Resumen de Transferencias */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Resumen de Transferencias</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Total de Transferencias</p>
            <p className="text-2xl font-bold text-blue-400">
              {transferSummary.totalTransfers}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Transferencias desde Pablo</p>
            <p className="text-2xl font-bold text-blue-400">
              {transferSummary.fromPablo}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Transferencias desde Jose Carlos</p>
            <p className="text-2xl font-bold text-blue-400">
              {transferSummary.fromJoseCarlos}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow">
            <p className="font-semibold">Última Transferencia</p>
            <p className="text-2xl font-bold text-green-400">
              {transferSummary.lastTransferDate || "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
