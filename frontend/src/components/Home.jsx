import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'

function Home() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/formations/", {
      headers: { "Collaborateur-Id": collaborateurId }
    })
      .then(res => res.json())
      .then(data => setRole(data.role || ""));
  }, []);


  return (
    <div className="home">
      <h1 className="home-title">Gestion Collaborateurs & Formations</h1>

      <div className="home-buttons">
        <button
          onClick={() => navigate("/collaborateurs")}
          className="btn btn-blue"
        >
          👥 Collaborateurs
        </button>

        <button
          onClick={() => navigate("/formations")}
          className="btn btn-green"
        >
          📚 Formations
        </button>

        {/* 🔥 Collaborateur → bouton Mes demandes */}
        {role !== "Manager" && role !== "RH" && (
          <button
            onClick={() => navigate("/mes-demandes")}
            className="btn btn-purple"
          >
            📄 Mes demandes
          </button>
        )}

        {/* Manager → bouton demandes à valider */}
        {role === "Manager" && (
          <button
            onClick={() => navigate("/manager-demandes")}
            className="btn btn-yellow"
          >
            📝 Demandes reçues
          </button>
        )}

        {/* RH → futur bouton validations RH */}
        {role === "RH" && (
          <button
            onClick={() => navigate("/rh-validations")}
            className="btn btn-red"
          >
            🧾 Validations RH
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
