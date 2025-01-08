import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { FaTrash } from "react-icons/fa";

const DecantList = () => {
  const [decants, setDecants] = useState([]);
  const [groupedDecants, setGroupedDecants] = useState([]);
  const [uniquePerfumes, setUniquePerfumes] = useState([]);
  const [uniqueMaletas, setUniqueMaletas] = useState([]);
  const [selectedPerfumeFilter, setSelectedPerfumeFilter] = useState("");
  const [selectedMaletaFilter, setSelectedMaletaFilter] = useState("");
  const [selectedVendedor, setSelectedVendedor] = useState("");
  const [selectedDecant, setSelectedDecant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Obtener la lista de decants
  const fetchDecants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/decants`);
      const decantData = response.data.data || []; // Aseguramos que accedemos al array correcto

      setDecants(decantData);

      const grouped = decantData.reduce((acc, decant) => {
        const key = `${decant.perfume?.name || "Perfume Desconocido"}-${
          decant.maleta_destino
        }`;
        if (!acc[key]) {
          acc[key] = {
            groupId: `${decant.perfume_id}-${decant.maleta_destino}`,
            name: decant.perfume?.name || "Perfume Desconocido",
            maleta: decant.maleta_destino,
            cantidad: 0,
            contenido: 0,
            decants: [],
          };
        }
        acc[key].cantidad += 1;
        acc[key].contenido += decant.cantidad;
        acc[key].decants.push(decant);
        return acc;
      }, {});

      setGroupedDecants(Object.values(grouped));

      setUniquePerfumes(
        Array.from(
          new Set(decantData.map((decant) => decant.perfume?.name))
        ).filter(Boolean)
      );
      setUniqueMaletas(
        Array.from(
          new Set(decantData.map((decant) => decant.maleta_destino))
        ).filter(Boolean)
      );
    } catch (error) {
      console.error("Error al obtener decants:", error);
    }
  };

  useEffect(() => {
    fetchDecants();
  }, []);

  // ✅ Filtros
  const handlePerfumeFilterChange = (e) =>
    setSelectedPerfumeFilter(e.target.value);
  const handleMaletaFilterChange = (e) =>
    setSelectedMaletaFilter(e.target.value);
  const handleVendedorFilterChange = (e) => setSelectedVendedor(e.target.value);

  // ✅ Mostrar modal para eliminar un decant
  const handleDeleteDecant = (decant) => {
    setSelectedDecant(decant);
    setShowModal(true);
  };

  // ✅ Confirmar eliminación
  const handleConfirmDelete = async () => {
    try {
      if (!selectedDecant?.id) {
        alert("❌ El ID del decant no es válido.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/decants/${selectedDecant.id}`, {
        headers: { "Content-Type": "application/json" },
      });

      setShowModal(false);
      fetchDecants();
      alert("✅ Decant eliminado correctamente.");
    } catch (error) {
      console.error("❌ Error al eliminar decant:", error);
      alert("Hubo un error al intentar eliminar el decant.");
    }
  };

  // ✅ Cerrar Modal
  const closeModal = () => {
    setSelectedDecant(null);
    setShowModal(false);
  };

  // ✅ Filtrar decants agrupados
  const filteredGroupedDecants = groupedDecants.filter((group) => {
    return (
      (selectedPerfumeFilter === "" || group.name === selectedPerfumeFilter) &&
      (selectedMaletaFilter === "" || group.maleta === selectedMaletaFilter)
    );
  });

  // ✅ Filtrar Resumen por Vendedor
  const resumenGrouped = groupedDecants.filter((group) => {
    return selectedVendedor === "" || group.maleta === selectedVendedor;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white text-black rounded-lg shadow-md space-y-6">
      {/* ✅ Resumen por Perfume */}
      <section className="bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resumen por Perfume</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Seleccionar Vendedor:
          </label>
          <select
            value={selectedVendedor}
            onChange={handleVendedorFilterChange}
            className="w-full p-2 rounded-md border"
          >
            <option value="">Todos</option>
            <option value="Pablo">Pablo</option>
            <option value="Jose Carlos">Jose Carlos</option>
          </select>
        </div>
        <ul>
          {resumenGrouped.map((group) => (
            <li
              key={group.groupId}
              className="flex justify-between py-1 border-b"
            >
              <span>{group.name}</span>
              <span>
                {group.cantidad} decants ({group.maleta})
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Filtros */}
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              Filtrar por Perfume:
            </label>
            <select
              value={selectedPerfumeFilter}
              onChange={handlePerfumeFilterChange}
              className="w-full p-2 rounded-md border"
            >
              <option value="">Todos</option>
              {uniquePerfumes.map((perfume) => (
                <option key={perfume} value={perfume}>
                  {perfume}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Filtrar por Maleta:
            </label>
            <select
              value={selectedMaletaFilter}
              onChange={handleMaletaFilterChange}
              className="w-full p-2 rounded-md border"
            >
              <option value="">Todas</option>
              {uniqueMaletas.map((maleta) => (
                <option key={maleta} value={maleta}>
                  {maleta}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ✅ Cards */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroupedDecants.map((group) =>
            group.decants.map((decant) => (
              <div
                key={decant.id}
                className="p-4 bg-white border rounded-lg shadow-md relative"
              >
                <h3 className="font-semibold">{group.name}</h3>
                <p>
                  <strong>Maleta:</strong> {group.maleta}
                </p>
                <p>
                  <strong>Cantidad:</strong> {decant.cantidad} ml
                </p>
                <button
                  onClick={() => handleDeleteDecant(decant)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Eliminar Decant</h3>
            <p>¿Estás seguro de eliminar este decant?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecantList;
