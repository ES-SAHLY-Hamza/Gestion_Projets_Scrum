// src/components/MesDemandesFormation.jsx  (nouveau nom plus clair)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormationsCatalogue.css"; // tu peux réutiliser ou créer un nouveau CSS
import Notification from "./Notification";

<<<<<<< HEAD
const MesDemandesFormation = () => {
  const [demandes, setDemandes] = useState([]);
=======
const FormationsCatalogue = () => {
  const [formations, setFormations] = useState([]);
  const [demandesEnvoyees, setDemandesEnvoyees] = useState(new Set()); // ← NEW
>>>>>>> ffe53160afb115b1d99ad236361b865867f77a37
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  // Chargement des formations + demandes déjà faites
>>>>>>> ffe53160afb115b1d99ad236361b865867f77a37
  useEffect(() => {
    const collaborateurId = localStorage.getItem("collaborateur_id");
    if (!collaborateurId) {
      setNotification("Veuillez vous connecter");
      setLoading(false);
      return;
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> ffe53160afb115b1d99ad236361b865867f77a37
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

<<<<<<< HEAD
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
=======
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
>>>>>>> ffe53160afb115b1d99ad236361b865867f77a37
      </div>

      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
};

<<<<<<< HEAD
export default MesDemandesFormation;
=======
export default FormationsCatalogue;
>>>>>>> ffe53160afb115b1d99ad236361b865867f77a37
