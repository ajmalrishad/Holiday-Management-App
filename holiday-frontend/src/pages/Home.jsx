import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import HolidayList from "../components/HolidayList";
import { fetchHolidays, searchHolidaysByType } from "../api";

const Home = () => {
  const [holidays, setHolidays] = useState([]);
  const [country, setCountry] = useState("US"); // Default country
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");
  const [holidayType, setHolidayType] = useState(""); // New: Filter by type

  useEffect(() => {
    loadHolidays();
  }, [country, year, month, holidayType]);

  const loadHolidays = async () => {
    let data = [];

    if (holidayType) {
      data = await searchHolidaysByType(country, year, holidayType);
    } else {
      data = await fetchHolidays(country, year, month);
    }

    setHolidays(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Holiday Management</h1>
      <SearchForm
        country={country} setCountry={setCountry}
        year={year} setYear={setYear}
        month={month} setMonth={setMonth}
        holidayType={holidayType} setHolidayType={setHolidayType}
      />
      <HolidayList holidays={holidays} />
    </div>
  );
};

export default Home;
