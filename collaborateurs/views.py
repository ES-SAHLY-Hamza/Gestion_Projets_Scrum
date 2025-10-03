from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Données globales (avec email + password)
COLLABORATEURS = [
    {"id": 1, "nom": "Dupont", "prenom": "Jean", "role": "Développeur",
     "date_integration": "2025-03-15", "annees_experience": 1,
     "email": "jean.dupont@entreprise.com", "password": "password1"},
    {"id": 2, "nom": "Martin", "prenom": "Claire", "role": "Business Analyst",
     "date_integration": "2019-07-01", "annees_experience": 6,
     "email": "claire.martin@entreprise.com", "password": "password2"},
    {"id": 3, "nom": "Durand", "prenom": "Paul", "role": "Développeur",
     "date_integration": "2021-01-10", "annees_experience": 9,
     "email": "paul.durand@entreprise.com", "password": "password3"},
    {"id": 4, "nom": "Lefevre", "prenom": "Sophie", "role": "UX Designer",
     "date_integration": "2022-06-20", "annees_experience": 3,
     "email": "sophie.lefevre@entreprise.com", "password": "password4"},
    {"id": 5, "nom": "Moreau", "prenom": "Lucas", "role": "Chef de projet",
     "date_integration": "2018-09-05", "annees_experience": 8,
     "email": "lucas.moreau@entreprise.com", "password": "password5"},
    {"id": 6, "nom": "Garcia", "prenom": "Emma", "role": "Business Analyst",
     "date_integration": "2021-11-12", "annees_experience": 4,
     "email": "emma.garcia@entreprise.com", "password": "password6"},
    {"id": 7, "nom": "Bernard", "prenom": "Hugo", "role": "Testeur",
     "date_integration": "2019-04-30", "annees_experience": 6,
     "email": "hugo.bernard@entreprise.com", "password": "password7"},
    {"id": 8, "nom": "Petit", "prenom": "Chloé", "role": "Product Owner",
     "date_integration": "2020-08-18", "annees_experience": 5,
     "email": "chloe.petit@entreprise.com", "password": "password8"},
    {"id": 9, "nom": "Roux", "prenom": "Maxime", "role": "Chef de projet",
     "date_integration": "2017-02-27", "annees_experience": 10,
     "email": "maxime.roux@entreprise.com", "password": "password9"},
    {"id": 10, "nom": "Fournier", "prenom": "Julie", "role": "Chef de projet",
     "date_integration": "2016-12-05", "annees_experience": 12,
     "email": "julie.fournier@entreprise.com", "password": "password10"},
    {"id": 11, "nom": "Morel", "prenom": "Antoine", "role": "Business Analyst",
     "date_integration": "2019-05-22", "annees_experience": 6,
     "email": "antoine.morel@entreprise.com", "password": "password11"},
    {"id": 12, "nom": "Girard", "prenom": "Camille", "role": "Testeur",
     "date_integration": "2024-09-14", "annees_experience": 2,
     "email": "camille.girard@entreprise.com", "password": "password12"},
    {"id": 13, "nom": "Andre", "prenom": "Thomas", "role": "Développeur",
     "date_integration": "2021-03-03", "annees_experience": 4,
     "email": "thomas.andre@entreprise.com", "password": "password13"},
    {"id": 14, "nom": "Lemoine", "prenom": "Sarah", "role": "Développeur",
     "date_integration": "2022-01-20", "annees_experience": 3,
     "email": "sarah.lemoine@entreprise.com", "password": "password14"},
    {"id": 15, "nom": "Blanc", "prenom": "Mathilde", "role": "Testeur",
     "date_integration": "2018-07-11", "annees_experience": 7,
     "email": "mathilde.blanc@entreprise.com", "password": "password15"},
    {"id": 16, "nom": "Garnier", "prenom": "Nicolas", "role": "Développeur",
     "date_integration": "2019-11-02", "annees_experience": 6,
     "email": "nicolas.garnier@entreprise.com", "password": "password16"},
    {"id": 17, "nom": "Chevalier", "prenom": "Laura", "role": "UX Designer",
     "date_integration": "2020-04-25", "annees_experience": 5,
     "email": "laura.chevalier@entreprise.com", "password": "password17"},
    {"id": 18, "nom": "Renaud", "prenom": "Julien", "role": "Chef de projet",
     "date_integration": "2017-10-17", "annees_experience": 11,
     "email": "julien.renaud@entreprise.com", "password": "password18"},
    {"id": 19, "nom": "Dupuis", "prenom": "Alice", "role": "Développeur",
     "date_integration": "2021-06-08", "annees_experience": 4,
     "email": "alice.dupuis@entreprise.com", "password": "password19"},
    {"id": 20, "nom": "Marchand", "prenom": "Victor", "role": "Testeur",
     "date_integration": "2019-02-14", "annees_experience": 7,
     "email": "victor.marchand@entreprise.com", "password": "password20"},
    {"id": 21, "nom": "Leroy", "prenom": "Inès", "role": "Product Owner",
     "date_integration": "2020-12-03", "annees_experience": 7,
     "email": "ines.leroy@entreprise.com", "password": "password21"},
    {"id": 22, "nom": "Colin", "prenom": "Louis", "role": "Chef de projet",
     "date_integration": "2016-09-19", "annees_experience": 13,
     "email": "louis.colin@entreprise.com", "password": "password22"},
    {"id": 23, "nom": "Fabre", "prenom": "Manon", "role": "Product Owner",
     "date_integration": "2018-05-07", "annees_experience": 8,
     "email": "manon.fabre@entreprise.com", "password": "password23"},
    {"id": 24, "nom": "Mercier", "prenom": "Adrien", "role": "Développeur",
     "date_integration": "2021-08-30", "annees_experience": 4,
     "email": "adrien.mercier@entreprise.com", "password": "password24"},
    {"id": 25, "nom": "Leclerc", "prenom": "Léa", "role": "Développeur",
     "date_integration": "2022-02-15", "annees_experience": 3,
     "email": "lea.leclerc@entreprise.com", "password": "password25"},
    {"id": 26, "nom": "Gauthier", "prenom": "Mathis", "role": "Développeur",
     "date_integration": "2019-03-12", "annees_experience": 7,
     "email": "mathis.gauthier@entreprise.com", "password": "password26"},
    {"id": 27, "nom": "Perrin", "prenom": "Clara", "role": "Développeur",
     "date_integration": "2020-10-05", "annees_experience": 9,
     "email": "clara.perrin@entreprise.com", "password": "password27"},
    {"id": 28, "nom": "Robin", "prenom": "Alexandre", "role": "Testeur",
     "date_integration": "2024-11-21", "annees_experience": 2,
     "email": "alexandre.robin@entreprise.com", "password": "password28"},
]


FORMATIONS = [
    # 5 internes et gratuites
    {"id": 1, "name": "Onboarding sécurité interne", "type": "Interne", "price": 0, "certified": False, "specification": ["Business Analyst", "Développeur", "Testeur"]},
    {"id": 2, "name": "Bonnes pratiques Git", "type": "Interne", "price": 0, "certified": False, "specification": ["Développeur", "Chef de projet"]},
    {"id": 3, "name": "Sécurité des données (atelier)", "type": "Interne", "price": 0, "certified": False, "specification": ["Analyste", "Product Owner"]},
    {"id": 4, "name": "Communication efficace en équipe", "type": "Interne", "price": 0, "certified": False, "specification": ["Tous"]},
    {"id": 5, "name": "Gestion du temps et priorisation", "type": "Interne", "price": 0, "certified": False, "specification": ["Chef de projet", "UX Designer"]},

    # 3 externes, non certifiantes, payantes
    {"id": 6, "name": "Atelier UX design (extern)", "type": "Externe - Non certifiante", "price": 250, "certified": False, "specification": ["UX Designer", "Product Owner"]},
    {"id": 7, "name": "Formation Excel avancé (extern)", "type": "Externe - Non certifiante", "price": 180, "certified": False, "specification": ["Business Analyst", "Finance"]},
    {"id": 8, "name": "Atelier prise de parole (extern)", "type": "Externe - Non certifiante", "price": 200, "certified": False, "specification": ["Tous"]},

    # 2 externes, certifiantes, payantes
    {"id": 9, "name": "Certif. Cloud Architect (extern)", "type": "Externe - Certifiante", "price": 1200, "certified": True, "specification": ["Développeur", "DevOps"]},
    {"id": 10, "name": "Certif. Data Ethics (extern)", "type": "Externe - Certifiante", "price": 900, "certified": True, "specification": ["Business Analyst", "Product Owner"]},
]

def formations_list(request):
    return JsonResponse({"formations": FORMATIONS}, safe=False)

class CollaborateurMockView(APIView):
    def get(self, request):
        # On supprime email & password avant d'envoyer la réponse
        safe_collaborateurs = [
            {k: v for k, v in c.items() if k not in ["email", "password"]}
            for c in COLLABORATEURS
        ]
        return Response(safe_collaborateurs)


class LoginMockView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # On cherche un collaborateur qui correspond
        user = next(
            (c for c in COLLABORATEURS if c["email"] == email and c["password"] == password),
            None
        )

        if user:
            return Response(
                {
                    "message": "Authentification réussie",
                    "token": "fake-jwt-token-123",
                    "collaborateur_id": user["id"],  # optionnel
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "Email ou mot de passe incorrect"},
            status=status.HTTP_401_UNAUTHORIZED,
        )