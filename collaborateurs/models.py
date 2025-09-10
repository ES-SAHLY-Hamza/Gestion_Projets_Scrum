from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import date

class Formation(models.Model):
    TYPE_CHOICES = [
        ('INTERNE', 'Formation interne gratuite'),
        ('DEMANDE_NON_CERT', 'Formation à la demande non certifiante'),
        ('DEMANDE_CERT', 'Formation à la demande certifiante'),
    ]
    
    nom = models.CharField(max_length=200, verbose_name="Nom de la formation")
    description = models.TextField(verbose_name="Description")
    type_formation = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        verbose_name="Type de formation"
    )
    duree_heures = models.PositiveIntegerField(verbose_name="Durée en heures")
    prix = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0.00,
        verbose_name="Prix (€)"
    )
    est_certifiante = models.BooleanField(default=False, verbose_name="Certifiante")
    organisme = models.CharField(max_length=100, blank=True, verbose_name="Organisme")
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Formation"
        verbose_name_plural = "Formations"
        ordering = ['nom']
    
    def __str__(self):
        return f"{self.nom} ({self.get_type_formation_display()})"

class Collaborateur(models.Model):
    ROLE_CHOICES = [
        ('DEV_C', 'Développeur C'),
        ('DEV_CPP', 'Développeur C++'),
        ('DEV_JAVA', 'Développeur Java'),
        ('DEV_PYTHON', 'Développeur Python'),
        ('DEV_JS', 'Développeur JavaScript'),
        ('BUSINESS_ANALYST', 'Business Analyst'),
        ('DATA_ANALYST', 'Data Analyst'),
        ('DATA_SCIENTIST', 'Data Scientist'),
        ('SCRUM_MASTER', 'Scrum Master'),
        ('PRODUCT_OWNER', 'Product Owner'),
        ('DEVOPS', 'DevOps Engineer'),
        ('QA', 'QA Engineer'),
        ('UI_UX', 'UI/UX Designer'),
        ('TECH_LEAD', 'Tech Lead'),
        ('ARCHITECT', 'Architecte Logiciel'),
    ]
    
    nom = models.CharField(max_length=100, verbose_name="Nom")
    prenom = models.CharField(max_length=100, verbose_name="Prénom")
    email = models.EmailField(unique=True, verbose_name="Email professionnel")
    role_actuel = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        verbose_name="Rôle actuel"
    )
    date_integration = models.DateField(verbose_name="Date d'intégration")
    annees_experience = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(50)],
        verbose_name="Années d'expérience"
    )
    telephone = models.CharField(max_length=15, blank=True, verbose_name="Téléphone")
    salaire = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        blank=True, 
        null=True,
        verbose_name="Salaire annuel (€)"
    )
    formations_suivies = models.ManyToManyField(
        Formation,
        through='CollaborateurFormation',
        blank=True,
        verbose_name="Formations suivies"
    )
    actif = models.BooleanField(default=True, verbose_name="Actif")
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Collaborateur"
        verbose_name_plural = "Collaborateurs"
        ordering = ['nom', 'prenom']
    
    def __str__(self):
        return f"{self.prenom} {self.nom} - {self.get_role_actuel_display()}"
    
    @property
    def nom_complet(self):
        return f"{self.prenom} {self.nom}"
    
    @property
    def anciennete_mois(self):
        """Calcule l'ancienneté en mois depuis la date d'intégration"""
        if not self.date_integration:
            return 0
        today = date.today()
        delta = today - self.date_integration
        return int(delta.days / 30.44)
    
    @property
    def anciennete_annees(self):
        """Calcule l'ancienneté en années"""
        return round(self.anciennete_mois / 12, 1)

class CollaborateurFormation(models.Model):
    STATUT_CHOICES = [
        ('PLANIFIEE', 'Planifiée'),
        ('EN_COURS', 'En cours'),
        ('TERMINEE', 'Terminée'),
        ('ABANDONNEE', 'Abandonnée'),
    ]
    
    collaborateur = models.ForeignKey(
        Collaborateur, 
        on_delete=models.CASCADE,
        verbose_name="Collaborateur"
    )
    formation = models.ForeignKey(
        Formation, 
        on_delete=models.CASCADE,
        verbose_name="Formation"
    )
    date_debut = models.DateField(verbose_name="Date de début")
    date_fin = models.DateField(blank=True, null=True, verbose_name="Date de fin")
    statut = models.CharField(
        max_length=15,
        choices=STATUT_CHOICES,
        default='PLANIFIEE',
        verbose_name="Statut"
    )
    note = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(20)],
        verbose_name="Note (/20)"
    )
    commentaire = models.TextField(blank=True, verbose_name="Commentaire")
    certificat_obtenu = models.BooleanField(default=False, verbose_name="Certificat obtenu")
    date_creation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Formation du collaborateur"
        verbose_name_plural = "Formations des collaborateurs"
        unique_together = ['collaborateur', 'formation', 'date_debut']
        ordering = ['-date_debut']
    
    def __str__(self):
        return f"{self.collaborateur.nom_complet} - {self.formation.nom} ({self.statut})"
