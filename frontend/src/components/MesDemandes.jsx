/* import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MesDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/mes-demandes/", {
      headers: { "Collaborateur-Id": id }
    })
      .then(res => res.json())
      .then(data => setDemandes(data.demandes || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="mes-demandes-container">
      <button className="back-button" onClick={() => navigate("/")}>← Retour</button>
      <h1>📄 Mes demandes de formation</h1>

      {demandes.length === 0 ? (
        <p>Aucune demande effectuée.</p>
      ) : (
        <ul className="demandes-list">
          {demandes.map((d) => (
            <li key={d.id} className="demande-item">
                <strong>Formation :</strong> {d.formation} <br />

                <strong>Collaborateur :</strong> {d.collaborateur} <br />

                <strong>Prix :</strong> {d.prix === 0 ? "Gratuite" : `${d.prix} €`} <br />

                <strong>Certifiante :</strong> {d.certifiante ? "Oui" : "Non"} <br />
                <strong>Date de demande :</strong> {d.date_demande} <br />
                
                <strong>Statut :</strong> {d.statut} <br />
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default MesDemandes;
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MesDemandes.css";

function MesDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/mes-demandes/", {
      headers: { "Collaborateur-Id": id }
    })
      .then(res => res.json())
      .then(data => setDemandes(data.demandes || []))
      .finally(() => setLoading(false));
  }, []);

  const getStatutClass = (statut) => {
    const s = statut.toLowerCase();
    if (s.includes('valid')) return 'statut-valide';
    if (s.includes('refus')) return 'statut-refuse';
    return 'statut-en-attente';
  };

  if (loading) return <div className="loading-message">Chargement...</div>;

  return (
    <div className="mes-demandes-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Retour
      </button>
      
      <h1>📄 Mes demandes de formation</h1>

      {demandes.length === 0 ? (
        <div className="empty-message">Aucune demande effectuée.</div>
      ) : (
        <table className="demandes-table">
          <thead>
            <tr>
              <th>Formation</th>
              <th>Collaborateur</th>
              <th>Prix</th>
              <th>Certifiante</th>
              <th>Date demande</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((d) => (
              <tr key={d.id}>
                <td><strong>{d.formation}</strong></td>
                <td>{d.collaborateur}</td>
                <td className={d.prix === 0 ? 'prix-gratuit' : ''}>
                  {d.prix === 0 ? "Gratuite" : `${d.prix} €`}
                </td>
                <td className={d.certifiante ? 'certif-oui' : 'certif-non'}>
                  {d.certifiante ? "Oui" : "Non"}
                </td>
                <td>{d.date_demande}</td>
                <td>
                  <span className={`statut-badge ${getStatutClass(d.statut)}`}>
                    {d.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MesDemandes;