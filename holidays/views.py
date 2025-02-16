import environ
import requests
from django.conf import settings
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Load environment variables
env = environ.Env()
environ.Env.read_env()  # This loads the .env file
CALENDARIFIC_API_KEY = env("API_KEY", default="") 



BASE_URL = "https://calendarific.com/api/v2/holidays"

@api_view(['GET'])
def get_holidays(request):
    country = request.GET.get('country')
    year = request.GET.get('year')
    month = request.GET.get('month') 

    if not country or not year:
        return Response({"error": "Country and Year are required"}, status=400)

    cache_key = f"holidays_{country}_{year}"
    cached_data = cache.get(cache_key)

    if not cached_data:
        params = {
            "api_key": CALENDARIFIC_API_KEY,
            "country": country,
            "year": year,
        }
        response = requests.get(BASE_URL, params=params)

        if response.status_code != 200:
            return Response({"error": "Failed to fetch data"}, status=500)

        cached_data = response.json()
        cache.set(cache_key, cached_data, timeout=86400)  # Cache for a day

    # If month is provided, filter holidays by month
    if month:
        try:
            month = int(month)  # Ensure month is a number
            cached_data["response"]["holidays"] = [
                holiday for holiday in cached_data["response"]["holidays"]
                if int(holiday["date"]["datetime"]["month"]) == month
            ]
        except ValueError:
            return Response({"error": "Invalid month format"}, status=400)

    return Response(cached_data)


#custom api for search holiday
@api_view(['GET'])
def search_holidays_by_names(request):
    country = request.GET.get('country')
    year = request.GET.get('year')
    month = request.GET.get('month') 
    search_query = request.GET.get('type', '').lower()

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
        cache.set(cache_key, holidays_data, timeout=86400)

    filtered_holidays = holidays_data["response"]["holidays"]

    # Filter by month if provided
    if month:
        try:
            month = int(month)  # Ensure month is a number
            filtered_holidays = [
                holiday for holiday in filtered_holidays
                if int(holiday["date"]["datetime"]["month"]) == month
            ]
        except ValueError:
            return Response({"error": "Invalid month format"}, status=400)

    # Filter by holiday type if search_query is provided
    if search_query:
        filtered_holidays = [
            holiday for holiday in filtered_holidays
            if search_query in " ".join(holiday["type"]).lower()
        ]

    return Response({"response": {"holidays": filtered_holidays}})
