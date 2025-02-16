import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v2";
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

const cache = new Map();

// Fetch holidays (General)
export const fetchHolidays = async (country, year, month = null) => {
  const cacheKey = `holidays_${country}_${year}_${month || "all"}`;

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return data;
    }
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/holidays/`, {
      params: { country, year, month },
    });

    const holidays = response.data.response.holidays || [];
    cache.set(cacheKey, { data: holidays, timestamp: Date.now() });
    return holidays;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return [];
  }
};

// Fetch holidays by type (Custom Search)
export const searchHolidaysByType = async (country, year, type) => {
  const cacheKey = `search_${country}_${year}_${type}`;

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return data;
    }
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/search_holidays_by_name/`, {
      params: { country, year, type },
    });

    const holidays = response.data.response.holidays || [];
    cache.set(cacheKey, { data: holidays, timestamp: Date.now() });
    return holidays;
  } catch (error) {
    console.error("Error searching holidays:", error);
    return [];
  }
};
