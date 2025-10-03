import React from "react";
import {useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">
        Gestion Collaborateurs & Formations
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <button
          onClick={() => navigate("/collaborateurs")}
          className="px-10 py-6 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-500 transition"
        >
          Collaborateurs
        </button>

        <button
          onClick={() => navigate("/formations")}
          className="px-10 py-6 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-500 transition"
        >
          Formations
        </button>
      </div>
    </div>
  );
}

export default Home;