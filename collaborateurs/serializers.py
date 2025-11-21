from rest_framework import serializers
from .models import Collaborateur, Formation, CollaborateurFormation, DemandeFormation

class FormationSerializer(serializers.ModelSerializer):
    type_formation_display = serializers.CharField(source='get_type_formation_display', read_only=True)
    
    class Meta:
        model = Formation
        fields = [
            'id', 'nom', 'description', 'type_formation', 'type_formation_display', 
            'duree_heures', 'prix', 'est_certifiante', 'organisme', 
            'date_creation', 'date_modification'
        ]
        read_only_fields = ['date_creation', 'date_modification']

class CollaborateurFormationSerializer(serializers.ModelSerializer):
    formation = FormationSerializer(read_only=True)
    formation_id = serializers.IntegerField(write_only=True)
    formation_nom = serializers.CharField(source='formation.nom', read_only=True)
    
    class Meta:
        model = CollaborateurFormation
        fields = [
            'id', 'formation', 'formation_id', 'formation_nom',
            'date_debut', 'date_fin', 'statut', 'note', 
            'commentaire', 'certificat_obtenu', 'date_creation'
        ]
        read_only_fields = ['date_creation']

class CollaborateurListSerializer(serializers.ModelSerializer):
    """Serializer pour la liste des collaborateurs (données allégées)"""
    role_actuel_display = serializers.CharField(source='get_role_actuel_display', read_only=True)
    nom_complet = serializers.CharField(read_only=True)
    anciennete_mois = serializers.IntegerField(read_only=True)
    anciennete_annees = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Collaborateur
        fields = [
            'id', 'nom', 'prenom', 'nom_complet', 'email', 
            'role_actuel', 'role_actuel_display', 'date_integration', 
            'annees_experience', 'anciennete_mois', 'anciennete_annees',
            'telephone', 'actif'
        ]

class CollaborateurDetailSerializer(serializers.ModelSerializer):
    """Serializer pour le détail d'un collaborateur (toutes les données)"""
    role_actuel_display = serializers.CharField(source='get_role_actuel_display', read_only=True)
    nom_complet = serializers.CharField(read_only=True)
    anciennete_mois = serializers.IntegerField(read_only=True)
    anciennete_annees = serializers.FloatField(read_only=True)
    formations_suivies = CollaborateurFormationSerializer(
        source='collaborateurformation_set', 
        many=True, 
        read_only=True
    )
    
    class Meta:
        model = Collaborateur
        fields = [
            'id', 'nom', 'prenom', 'nom_complet', 'email', 
            'role_actuel', 'role_actuel_display', 'date_integration', 
            'annees_experience', 'anciennete_mois', 'anciennete_annees',
            'telephone', 'salaire', 'formations_suivies', 'actif',
            'date_creation', 'date_modification'
        ]
        read_only_fields = ['date_creation', 'date_modification']

class CollaborateurCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer pour création/modification d'un collaborateur"""
    
    class Meta:
        model = Collaborateur
        fields = [
            'nom', 'prenom', 'email', 'role_actuel', 
            'date_integration', 'annees_experience', 
            'telephone', 'salaire', 'actif'
        ]
    
    def validate_email(self, value):
        """Validation personnalisée pour l'email"""
        if self.instance:
            # En cas de modification, exclure l'instance actuelle de la vérification
            if Collaborateur.objects.exclude(id=self.instance.id).filter(email=value).exists():
                raise serializers.ValidationError("Un collaborateur avec cet email existe déjà.")
        else:
            # En cas de création
            if Collaborateur.objects.filter(email=value).exists():
                raise serializers.ValidationError("Un collaborateur avec cet email existe déjà.")
        return value


class DemandeFormationSerializer(serializers.ModelSerializer):
    collaborateur_nom = serializers.CharField(source='collaborateur.get_full_name', read_only=True)
    formation_nom = serializers.CharField(source='formation.name', read_only=True)
    prix = serializers.DecimalField(source='formation.price', max_digits=10, decimal_places=2, read_only=True)
    certifiante = serializers.BooleanField(source='formation.certified', read_only=True)

    class Meta:
        model = DemandeFormation
        fields = [
            'id', 'collaborateur', 'collaborateur_nom',
            'formation', 'formation_nom', 'prix', 'certifiante',
            'date_demande', 'statut'
        ]
        read_only_fields = ['date_demande', 'statut', 'collaborateur']