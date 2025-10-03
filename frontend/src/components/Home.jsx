import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
}

export default Home;
