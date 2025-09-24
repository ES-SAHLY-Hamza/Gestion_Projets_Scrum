// src/components/CollaboratorsList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CollaboratorsList.css";

const CollaboratorsList = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* useEffect(() => {
    fetch("http://127.0.0.1:8000/api/collaborateurs/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur HTTP " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setCollaborators(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch :", error);
        setLoading(false);
      });
  }, []); */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/collaborateurs/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur HTTP " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setCollaborators(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch :", error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="table-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Retour
      </button>

      <h1>Liste des Collaborateurs</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date d'intégration</th>
            <th>Années d'expérience</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {collaborators.map((col) => (
            <tr key={col.id}>
              <td>{col.nom}</td>
              <td>{col.prenom}</td>
              <td>{new Date(col.date_integration).toLocaleDateString()}</td>
              <td>{col.annees_experience}</td>
              <td>{col.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollaboratorsList;
