from django.urls import path
from collaborateurs.views import CollaborateurMockView, formations_list, LoginMockView

urlpatterns = [
    path('collaborateurs/', CollaborateurMockView.as_view(), name='collaborateurs-mock'),
    path('formations/', formations_list, name='formations-list'),
    path('login/', LoginMockView.as_view(), name='login-mock'),
]
