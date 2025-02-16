from django.urls import path
from .views import get_holidays

urlpatterns = [
    path('holidays/', get_holidays, name='get_holidays'),
]
