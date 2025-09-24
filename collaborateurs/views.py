from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response

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
        data = [
            # Business Analysts (3)
            {"id": 1, "nom": "Dupont", "prenom": "Alice", "role": "Business Analyst", "date_integration": "2020-01-15", "annees_experience": 4},
            {"id": 2, "nom": "Martin", "prenom": "Paul", "role": "Business Analyst", "date_integration": "2021-03-10", "annees_experience": 3},
            {"id": 3, "nom": "Bernard", "prenom": "Clara", "role": "Business Analyst", "date_integration": "2019-07-22", "annees_experience": 5},

            # Développeurs (10)
            {"id": 4, "nom": "Durand", "prenom": "Jean", "role": "Développeur", "date_integration": "2022-02-01", "annees_experience": 2},
            {"id": 5, "nom": "Petit", "prenom": "Emma", "role": "Développeur", "date_integration": "2021-06-15", "annees_experience": 3},
            {"id": 6, "nom": "Moreau", "prenom": "Lucas", "role": "Développeur", "date_integration": "2020-09-30", "annees_experience": 4},
            {"id": 7, "nom": "Roux", "prenom": "Julie", "role": "Développeur", "date_integration": "2023-01-05", "annees_experience": 1},
            {"id": 8, "nom": "Leroy", "prenom": "Thomas", "role": "Développeur", "date_integration": "2021-11-12", "annees_experience": 3},
            {"id": 9, "nom": "Fabre", "prenom": "Sophie", "role": "Développeur", "date_integration": "2022-05-20", "annees_experience": 2},
            {"id": 10, "nom": "Garnier", "prenom": "Nicolas", "role": "Développeur", "date_integration": "2020-08-18", "annees_experience": 4},
            {"id": 11, "nom": "Chevalier", "prenom": "Laura", "role": "Développeur", "date_integration": "2021-04-01", "annees_experience": 3},
            {"id": 12, "nom": "Blanc", "prenom": "Alexandre", "role": "Développeur", "date_integration": "2019-12-10", "annees_experience": 5},
            {"id": 13, "nom": "Robin", "prenom": "Camille", "role": "Développeur", "date_integration": "2022-07-25", "annees_experience": 2},

            # Testeurs (5)
            {"id": 14, "nom": "Lemoine", "prenom": "Mathilde", "role": "Testeur", "date_integration": "2021-01-12", "annees_experience": 3},
            {"id": 15, "nom": "Mercier", "prenom": "Adrien", "role": "Testeur", "date_integration": "2020-03-18", "annees_experience": 4},
            {"id": 16, "nom": "Leclerc", "prenom": "Inès", "role": "Testeur", "date_integration": "2022-06-30", "annees_experience": 2},
            {"id": 17, "nom": "Gauthier", "prenom": "Victor", "role": "Testeur", "date_integration": "2021-08-14", "annees_experience": 3},
            {"id": 18, "nom": "Perrin", "prenom": "Clara", "role": "Testeur", "date_integration": "2019-11-20", "annees_experience": 5},

            # Chefs de projet (5)
            {"id": 19, "nom": "Dupuis", "prenom": "Julien", "role": "Chef de projet", "date_integration": "2018-05-10", "annees_experience": 6},
            {"id": 20, "nom": "Marchand", "prenom": "Léa", "role": "Chef de projet", "date_integration": "2019-02-25", "annees_experience": 5},
            {"id": 21, "nom": "Colin", "prenom": "Maxime", "role": "Chef de projet", "date_integration": "2020-07-30", "annees_experience": 4},
            {"id": 22, "nom": "Fabre", "prenom": "Emma", "role": "Chef de projet", "date_integration": "2021-09-15", "annees_experience": 3},
            {"id": 23, "nom": "Leroy", "prenom": "Thomas", "role": "Chef de projet", "date_integration": "2022-03-10", "annees_experience": 2},

            # Product Owners (3)
            {"id": 24, "nom": "Renaud", "prenom": "Alice", "role": "Product Owner", "date_integration": "2019-04-12", "annees_experience": 5},
            {"id": 25, "nom": "Dupont", "prenom": "Victor", "role": "Product Owner", "date_integration": "2020-11-01", "annees_experience": 4},
            {"id": 26, "nom": "Martin", "prenom": "Clara", "role": "Product Owner", "date_integration": "2021-06-25", "annees_experience": 3},

            # UX Designers (2)
            {"id": 27, "nom": "Durand", "prenom": "Sophie", "role": "UX Designer", "date_integration": "2020-09-20", "annees_experience": 4},
            {"id": 28, "nom": "Petit", "prenom": "Mathilde", "role": "UX Designer", "date_integration": "2021-12-05", "annees_experience": 3},
        ]
        return Response(data)
