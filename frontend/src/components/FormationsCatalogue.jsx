// src/components/MesDemandesFormation.jsx  (nouveau nom plus clair)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormationsCatalogue.css"; // tu peux réutiliser ou créer un nouveau CSS
import Notification from "./Notification";

const MesDemandesFormation = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const collaborateurId = localStorage.getItem("collaborateur_id");

    if (!token || !collaborateurId) {
      setNotification("Vous devez être connecté.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/formations/mes-demandes/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Collaborateur-Id": collaborateurId,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setDemandes(data.demandes || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setNotification("Impossible de charger vos demandes.");
        setLoading(false);
      });
  }, []);

  // Fonction pour afficher le statut avec couleur et détail
  const getStatutBadge = (demande) => {
    const statut = demande.statut?.toLowerCase();

    if (statut === "validée") {
      return <span className="statut valide">Validée</span>;
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

  if (loading) return <p>Chargement de vos demandes...</p>;
  if (demandes.length === 0)
    return (
      <div className="catalogue-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Retour
        </button>
        <h1>Mes Demandes de Formation</h1>
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#666" }}>
          Vous n'avez pas encore demandé de formation.
        </p>
      </div>
    );

  return (
    <div className="catalogue-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1>Mes Demandes de Formation</h1>

      <div className="cards-grid">
        {demandes.map((demande) => (
          <div key={demande.id} className="formation-card demande-card">
            <h2 className="formation-name">{demande.formation.name}</h2>

            <p>
              <strong>Type :</strong> {demande.formation.type}
            </p>
            <p>
              <strong>Prix :</strong>{" "}
              {demande.formation.price === 0 ? "Gratuit" : `${demande.formation.price} €`}
            </p>
            <p>
              <strong>Date de demande :</strong>{" "}
              {new Date(demande.date_demande).toLocaleDateString("fr-FR")}
            </p>

            <div className="statut-container">
              <strong>État :</strong> {getStatutBadge(demande)}
            </div>

            {demande.raison_refus && (
              <div className="raison-refus">
                <strong>Raison du refus :</strong> {demande.raison_refus}
              </div>
            )}
          </div>
        ))}
      </div>

      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
};

export default MesDemandesFormation;