// src/components/FormationsCatalogue.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormationsCatalogue.css";

const FormationsCatalogue = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/formations/")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        setFormations(data.formations || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des formations...</p>;

  return (
    <div className="catalogue-container">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Retour
      </button>

      <h1>Catalogue des Formations</h1>
      <div className="cards-grid">
        {formations.map((formation) => (
          <div key={formation.id} className="formation-card">
            <h2 className="formation-name">{formation.name}</h2>
            <p><strong>Type :</strong> {formation.type}</p>
            <p><strong>Prix :</strong> {formation.price === 0 ? "Gratuit" : `${formation.price} €`}</p>
            <p><strong>Certifiée :</strong> {formation.certified ? "Oui" : "Non"}</p>
            <div>
              <strong>Rôles adaptés :</strong>
              <ul>
                {formation.specification.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationsCatalogue;
