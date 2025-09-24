from django.urls import path
from collaborateurs.views import CollaborateurMockView, formations_list

urlpatterns = [
    path('collaborateurs/', CollaborateurMockView.as_view(), name='collaborateurs-mock'),
    path('formations/', formations_list, name='formations-list'),

]
