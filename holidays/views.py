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

#custom api for search holiday by name
@api_view(['GET'])
def search_holidays_by_names(request):
    country = request.GET.get('country')
    year = request.GET.get('year')
    search_query = request.GET.get('type', '').lower()  # Search by holiday name (optional)
    if not country or not year:
        return Response({"error": "Country and Year are required"}, status=400)

    cache_key = f"holidays_{country}_{year}"
    holidays_data = cache.get(cache_key)

    if not holidays_data:
        params = {
            "api_key": CALENDARIFIC_API_KEY,
            "country": country,
            "year": year,
        }
        response = requests.get(BASE_URL, params=params)
        if response.status_code != 200:
            return Response({"error": "Failed to fetch data"}, status=500)

        holidays_data = response.json()
        cache.set(cache_key, holidays_data, timeout=86400)  # Cache for 24 hours

    # Apply search filter if a query is provided
    if search_query:
        holidays_data["response"]["holidays"] = [
            holiday for holiday in holidays_data["response"]["holidays"]
            if search_query in holiday["name"].lower()
        ]

    return Response(holidays_data)