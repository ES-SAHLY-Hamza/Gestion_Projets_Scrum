from rest_framework.views import APIView
from rest_framework.response import Response

class CollaborateurMockView(APIView):
    def get(self, request):
        collaborateurs = [
            {"id": 1, "nom": "Dupont", "prenom": "Jean", "role": "Développeur Python", "date_integration": "2025-03-15", "annees_experience": 1},
            {"id": 2, "nom": "Martin", "prenom": "Claire", "role": "Data Scientist", "date_integration": "2019-07-01", "annees_experience": 6},
            {"id": 3, "nom": "Durand", "prenom": "Paul", "role": "DevOps Engineer", "date_integration": "2021-01-10", "annees_experience": 9},
            {"id": 4, "nom": "Lefevre", "prenom": "Sophie", "role": "UI/UX Designer", "date_integration": "2022-06-20", "annees_experience": 3},
            {"id": 5, "nom": "Moreau", "prenom": "Lucas", "role": "Scrum Master", "date_integration": "2018-09-05", "annees_experience": 8},
            {"id": 6, "nom": "Garcia", "prenom": "Emma", "role": "Business Analyst", "date_integration": "2021-11-12", "annees_experience": 4},
            {"id": 7, "nom": "Bernard", "prenom": "Hugo", "role": "QA Engineer", "date_integration": "2019-04-30", "annees_experience": 6},
            {"id": 8, "nom": "Petit", "prenom": "Chloé", "role": "Product Owner", "date_integration": "2020-08-18", "annees_experience": 5},
            {"id": 9, "nom": "Roux", "prenom": "Maxime", "role": "Tech Lead", "date_integration": "2017-02-27", "annees_experience": 10},
            {"id": 10, "nom": "Fournier", "prenom": "Julie", "role": "Architecte Logiciel", "date_integration": "2016-12-05", "annees_experience": 12},
            {"id": 11, "nom": "Morel", "prenom": "Antoine", "role": "Data Analyst", "date_integration": "2019-05-22", "annees_experience": 6},
            {"id": 12, "nom": "Girard", "prenom": "Camille", "role": "Développeur JavaScript", "date_integration": "2024-09-14", "annees_experience": 2},
            {"id": 13, "nom": "Andre", "prenom": "Thomas", "role": "Développeur C++", "date_integration": "2021-03-03", "annees_experience": 4},
            {"id": 14, "nom": "Lemoine", "prenom": "Sarah", "role": "Développeur C", "date_integration": "2022-01-20", "annees_experience": 3},
            {"id": 15, "nom": "Blanc", "prenom": "Mathilde", "role": "DevOps Engineer", "date_integration": "2018-07-11", "annees_experience": 7},
            {"id": 16, "nom": "Garnier", "prenom": "Nicolas", "role": "Data Scientist", "date_integration": "2019-11-02", "annees_experience": 6},
            {"id": 17, "nom": "Chevalier", "prenom": "Laura", "role": "UI/UX Designer", "date_integration": "2020-04-25", "annees_experience": 5},
            {"id": 18, "nom": "Renaud", "prenom": "Julien", "role": "Scrum Master", "date_integration": "2017-10-17", "annees_experience": 11},
            {"id": 19, "nom": "Dupuis", "prenom": "Alice", "role": "Business Analyst", "date_integration": "2021-06-08", "annees_experience": 4},
            {"id": 20, "nom": "Marchand", "prenom": "Victor", "role": "QA Engineer", "date_integration": "2019-02-14", "annees_experience": 7},
            {"id": 21, "nom": "Leroy", "prenom": "Inès", "role": "Product Owner", "date_integration": "2020-12-03", "annees_experience": 7},
            {"id": 22, "nom": "Colin", "prenom": "Louis", "role": "Tech Lead", "date_integration": "2016-09-19", "annees_experience": 13},
            {"id": 23, "nom": "Fabre", "prenom": "Manon", "role": "Architecte Logiciel", "date_integration": "2018-05-07", "annees_experience": 8},
            {"id": 24, "nom": "Mercier", "prenom": "Adrien", "role": "Data Analyst", "date_integration": "2021-08-30", "annees_experience": 4},
            {"id": 25, "nom": "Leclerc", "prenom": "Léa", "role": "Développeur JavaScript", "date_integration": "2022-02-15", "annees_experience": 3},
            {"id": 26, "nom": "Gauthier", "prenom": "Mathis", "role": "Développeur C++", "date_integration": "2019-03-12", "annees_experience": 7},
            {"id": 27, "nom": "Perrin", "prenom": "Clara", "role": "Développeur C", "date_integration": "2020-10-05", "annees_experience": 9},
            {"id": 28, "nom": "Robin", "prenom": "Alexandre", "role": "DevOps Engineer", "date_integration": "2024-11-21", "annees_experience": 2},
        ]
        return Response(collaborateurs)
