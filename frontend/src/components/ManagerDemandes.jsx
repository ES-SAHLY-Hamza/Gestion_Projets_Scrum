import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ManagerDemandes.css";
import Notification from "./Notification";

function ManagerDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/manager/demandes/", {
      headers: { "Collaborateur-Id": collaborateurId }
    })
      .then(res => res.json())
      .then(data => setDemandes(data.demandes || []));
  }, []);

  const traiterDemande = (id, action) => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/manager/demandes/valider/", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Collaborateur-Id": collaborateurId,
        },
        body: JSON.stringify({ demande_id: id, action }),
    })
        .then(res => res.json())
        .then((data) => {

        // 👉 Afficher la notification
        setNotification(
            action === "valider"
            ? "La formation a été validée avec succès 🎉"
            : "La demande a été refusée ❌"
        );
        // 👉 Retirer la ligne du tableau
        setDemandes(prev => prev.filter(d => d.id !== id));
        });
    };


  /* const traiterDemande = (id, action) => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/manager/demandes/valider/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Collaborateur-Id": collaborateurId,
      },
      body: JSON.stringify({ demande_id: id, action }),
    })
      .then(res => res.json())
      .then(() => {
        setDemandes(prev => prev.filter(d => d.id !== id));
      });
  }; */

  return (
    <div className="manager-demandes-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Retour
      </button>
      
      <h1>📋 Demandes reçues</h1>

      {demandes.length === 0 ? (
        <p>Aucune demande en attente</p>
      ) : (
        <table className="demandes-table">
          <thead>
            <tr>
              <th>Collaborateur</th>
              <th>Formation</th>
              <th>Prix</th>
              <th>Certifiante</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((d) => (
              <tr key={d.id}>
                <td>{d.collaborateur}</td>
                <td><strong>{d.formation}</strong></td>
                <td className={d.prix === 0 ? 'prix-gratuit' : ''}>
                  {d.prix === 0 ? "Gratuite" : `${d.prix} €`}
                </td>
                <td className={d.certifiante ? 'certif-oui' : 'certif-non'}>
                  {d.certifiante ? "Oui" : "Non"}
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn-validate"
                      onClick={() => traiterDemande(d.id, "valider")}
                    >
                      Valider
                    </button>
                    <button
                      className="btn-refuse"
                      onClick={() => traiterDemande(d.id, "refuser")}
                    >
                      Refuser
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
}

export default ManagerDemandes;
/* import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManagerDemandes() {
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/manager/demandes/", {
      headers: { "Collaborateur-Id": collaborateurId }
    })
      .then(res => res.json())
      .then(data => setDemandes(data.demandes || []));
  }, []);

  const traiterDemande = (id, action) => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/manager/demandes/valider/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Collaborateur-Id": collaborateurId,
      },
      body: JSON.stringify({ demande_id: id, action }),
    })
      .then(res => res.json())
      .then(() => {
        // Met à jour la liste localement
        setDemandes(prev => prev.filter(d => d.id !== id));
      });
  };

  return (
    <div className="manager-demandes-container">
      <button className="back-button" onClick={() => navigate("/")}>← Retour</button>
      <h1>Demandes reçues</h1>

      {demandes.length === 0 && <p>Aucune demande en attente</p>}

      <ul className="demandes-list">
        {demandes.map((d) => (
          <li key={d.id} className="demande-item">
            <strong>Collaborateur :</strong> {d.collaborateur} <br />
            <strong>Formation :</strong> {d.formation} <br />
            <strong>Prix :</strong> {d.prix} €<br />
            <strong>Certifiante :</strong> {d.certifiante ? "Oui" : "Non"}<br />

            <button
              className="btn-validate"
              onClick={() => traiterDemande(d.id, "valider")}
            >
              ✔️ Valider
            </button>

            <button
              className="btn-refuse"
              onClick={() => traiterDemande(d.id, "refuser")}
            >
              ❌ Refuser
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerDemandes;
 */