import React, { useEffect, useState } from "react";
import axios from "axios";

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/perfumes");
        setPerfumes(response.data);
      } catch (err) {
        console.error("Error al obtener perfumes:", err);
        setError("Error al obtener perfumes");
      }
    };

    fetchPerfumes();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Inventario de Perfumes
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perfumes.length > 0 ? (
            perfumes.map((perfume) => (
              <div
                key={perfume.id}
                className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-700">
                  {perfume.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  <strong>Total ML:</strong> {perfume.total_ml} ml
                </p>
                <p className="text-gray-600">
                  <strong>ML Restantes:</strong> {perfume.remaining_ml} ml
                </p>
                <p className="mt-2 font-medium text-gray-800">
                  Estado:{" "}
                  <span
                    className={`${
                      perfume.status === "Disponible"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {perfume.status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No hay perfumes disponibles.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PerfumeList;
