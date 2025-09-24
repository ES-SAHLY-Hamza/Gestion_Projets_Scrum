// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import CollaboratorsList from "./components/CollaboratorsList";
import FormationsCatalogue from "./components/FormationsCatalogue";

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collaborateurs" element={<CollaboratorsList />} />
        <Route path="/formations" element={<FormationsCatalogue />} />
      </Routes>
    </Router>
  );
}

export default App;
