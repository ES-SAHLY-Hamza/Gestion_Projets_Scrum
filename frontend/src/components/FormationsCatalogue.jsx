// src/components/MesDemandesFormation.jsx  (nouveau nom plus clair)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormationsCatalogue.css"; // tu peux réutiliser ou créer un nouveau CSS
import Notification from "./Notification";

const FormationsCatalogue = () => {
  const [formations, setFormations] = useState([]);
  const [demandesEnvoyees, setDemandesEnvoyees] = useState(new Set()); // ← NEW
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Chargement des formations + demandes déjà faites
  useEffect(() => {
    const collaborateurId = localStorage.getItem("collaborateur_id");
    if (!collaborateurId) {
      setNotification("Veuillez vous connecter");
      setLoading(false);
      return;
    }

    // Récupère les formations
    fetch("http://127.0.0.1:8000/api/formations/", {
      headers: { "Collaborateur-Id": collaborateurId },
    })
      .then(res => res.json())
      .then(data => {
          setFormations(data.formations || []);
          setRole(data.role || "");   // ← AJOUT
      })
      .catch(() => setNotification("Erreur de chargement des formations"));

    // Récupère les demandes déjà faites (pour bloquer le bouton)
    fetch("http://127.0.0.1:8000/api/mes-demandes/", {
      headers: { "Collaborateur-Id": collaborateurId },
    })
      .then(res => res.json())
      .then(data => {
        const ids = data.demandes?.map(d => d.formation_id) || [];
        setDemandesEnvoyees(new Set(ids));
      })
      .finally(() => setLoading(false));
  }, []);

  const demanderFormation = async (formationId) => {
    const collaborateurId = localStorage.getItem("collaborateur_id");
    setSelectedFormation(formationId);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/formations/demander/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Collaborateur-Id": collaborateurId,
        },
        body: JSON.stringify({ formation_id: formationId }),
      });

      const data = await res.json();

      if (res.ok) {
        // Utilise directement le message du backend (parfait !)
        setNotification(data.message);

        // Si pas déjà demandée → on l’ajoute au Set pour griser le bouton
        if (!data.deja_demandee) {
          setDemandesEnvoyees(prev => new Set(prev).add(formationId));
        }
      } else {
        setNotification(data.message || "Erreur lors de la demande");
      }
    } catch (err) {
      setNotification("Erreur réseau");
    } finally {
      setSelectedFormation(null);
    }
    if (statut === "refusée") {
      return <span className="statut refuse">Refusée</span>;
    }
    if (statut === "en cours de décision" || statut === "en attente") {
      const attente = demande.en_attente_de === "RH" ? "En attente RH" : "En attente Manager";
      return (
        <span className="statut en-cours">
          En cours <small style={{ display: "block", fontSize: "0.8em" }}>({attente})</small>
        </span>
      );
    }
    return <span className="statut inconnu">Statut inconnu</span>;
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="catalogue-container">
      <button className="back-button" onClick={() => navigate("/")}>← Retour</button>
      <h1>Catalogue des Formations</h1>

      <div className="cards-grid">
        {formations.map((formation) => {
          const estDejaDemandee = demandesEnvoyees.has(formation.id);
          const estGratuite = formation.price === 0;

          return (
            <div key={formation.id} className="formation-card">
              <h2 className="formation-name">{formation.name}</h2>
              <p><strong>Type :</strong> {formation.type}</p>
              <p><strong>Prix :</strong> {estGratuite ? "Gratuit" : `${formation.price} €`}</p>
              <p><strong>Certifiée :</strong> {formation.certified ? "Oui" : "Non"}</p>

              <div>
                <strong>Rôles adaptés :</strong>
                <ul>
                  {formation.specification.map((role, i) => (
                    <li key={i}>{role}</li>
                  ))}
                </ul>
              </div>

              {role !== "Manager" && role !== "RH" && (
                <button
                  onClick={() => demanderFormation(formation.id)}
                  disabled={selectedFormation === formation.id || estDejaDemandee}
                  className={`demande-btn ${
                    estDejaDemandee
                      ? "deja"
                      : estGratuite
                      ? "gratuite"
                      : formation.certified
                      ? "certifiante"
                      : "payante"
                  }`}
                >
                  {selectedFormation === formation.id
                    ? "Envoi..."
                    : estDejaDemandee
                    ? "Déjà demandée"
                    : estGratuite
                    ? "Suivre gratuitement"
                    : formation.certified
                    ? "Demander (certifiante)"
                    : "Demander la formation"}
                </button>
            )}

            </div>
          );
        })}
      </div>

      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
};

export default FormationsCatalogue;
