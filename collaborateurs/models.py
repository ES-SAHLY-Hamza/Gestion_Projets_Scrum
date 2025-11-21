# app/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

# --- Utilisateur / Collaborateur ---
class Collaborateur(AbstractUser):
    # AbstractUser gère déjà username, email, password, etc.
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=[
        ("Collaborateur", "Collaborateur"),
        ("Manager", "Manager"),
        ("RH", "RH"),
        ("Développeur", "Développeur"),
        ("Testeur", "Testeur"),
        ("UX Designer", "UX Designer"),
        ("Business Analyst", "Business Analyst"),
        ("Chef de projet", "Chef de projet"),
        ("Product Owner", "Product Owner"),
    ])
    date_integration = models.DateField(null=True, blank=True)
    annees_experience = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.role})"


# --- Formations ---
class Formation(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100)  # Interne / Externe
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    certified = models.BooleanField(default=False)
    specification = models.JSONField(default=list)  # liste des rôles ciblés

    def __str__(self):
        return self.name


# models.py (ajoute ça à la fin si tu veux le remettre plus tard)
class CollaborateurFormation(models.Model):
    collaborateur = models.ForeignKey('Collaborateur', on_delete=models.CASCADE)
    formation = models.ForeignKey('Formation', on_delete=models.CASCADE)
    date_debut = models.DateField(null=True, blank=True)
    date_fin = models.DateField(null=True, blank=True)
    statut = models.CharField(max_length=20, default='planifiée')
    note = models.IntegerField(null=True, blank=True)
    certificat_obtenu = models.BooleanField(default=False)
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('collaborateur', 'formation')

        
# --- Demandes de formation ---
class DemandeFormation(models.Model):
    STATUTS = [
        ("En attente", "En attente"),
        ("Validée", "Validée"),
        ("Refusée", "Refusée"),
    ]

    collaborateur = models.ForeignKey(
        Collaborateur, on_delete=models.CASCADE, related_name="demandes"
    )
    formation = models.ForeignKey(
        Formation, on_delete=models.CASCADE, related_name="demandes"
    )
    date_demande = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=20, choices=STATUTS, default="En attente")

    def __str__(self):
        return f"Demande de {self.collaborateur} pour {self.formation} ({self.statut})"
