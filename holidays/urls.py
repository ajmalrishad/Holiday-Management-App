from django.urls import path
from .views import get_holidays,search_holidays_by_names

urlpatterns = [
    path('holidays/', get_holidays, name='get_holidays'),
    path('search_holidays_by_name/', search_holidays_by_names, name='search_holidays_by_name'),

]
