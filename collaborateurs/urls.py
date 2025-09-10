from django.urls import path
from collaborateurs.views import CollaborateurMockView

urlpatterns = [
    path('collaborateurs/', CollaborateurMockView.as_view(), name='collaborateurs-mock'),
]
