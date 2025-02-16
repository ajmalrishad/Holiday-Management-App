import environ
import requests
from django.conf import settings
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Load environment variables
env = environ.Env()
environ.Env.read_env()  # This loads the .env file
CALENDARIFIC_API_KEY = env('API_KEY')


BASE_URL = "https://calendarific.com/api/v2/holidays"

@api_view(['GET'])
def get_holidays(request):
    country = request.GET.get('country')
    year = request.GET.get('year')
    cache_key = f"holidays_{country}_{year}"

    if cache.get(cache_key):
        return Response(cache.get(cache_key))

    params = {
        "api_key": CALENDARIFIC_API_KEY,
        "country": country,
        "year": year,
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    if response.status_code == 200:
        cache.set(cache_key, data, timeout=86400) 
        return Response(data)
    return Response({"error": "Failed to fetch data"}, status=500)
