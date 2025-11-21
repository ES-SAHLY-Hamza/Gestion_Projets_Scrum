// src/components/FormationsCatalogue.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormationsCatalogue.css";
import Notification from "./Notification";

const FormationsCatalogue = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // Récupérer les formations du backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/formations/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Collaborateur-Id": collaborateurId,
      },
    })
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
        setNotification("Erreur lors du chargement des formations.");
        setLoading(false);
      });
  }, []);

  // Fonction pour demander une formation
  const demanderFormation = async (formationId) => {
    const token = localStorage.getItem("token");
    setSelectedFormation(formationId);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/formations/demander/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Collaborateur-Id": localStorage.getItem("collaborateur_id"),
        },
        body: JSON.stringify({ formation_id: formationId }),
      });

      const data = await res.json();

      if (res.ok) {
        setNotification(`Demande envoyée ! Statut : ${data.statut}`);
      } else {
        setNotification(`Erreur : ${data.error || "Impossible de traiter la demande"}`);
      }
    } catch (err) {
      console.error(err);
      setNotification("Erreur lors de l'envoi de la demande.");
    } finally {
      setSelectedFormation(null);
    }
  };

  if (loading) return <p>Chargement des formations...</p>;

  return (
    <div className="catalogue-container">
      <button className="back-button" onClick={() => navigate("/")}>
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

            <button
              onClick={() => demanderFormation(formation.id)}
              disabled={selectedFormation === formation.id}
            >
              {selectedFormation === formation.id ? "Envoi en cours..." : "Demander cette formation"}
            </button>
          </div>
        ))}
      </div>

      {/* Notification */}
      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
};

export default FormationsCatalogue;
