const SearchForm = ({ country, setCountry, year, setYear, month, setMonth, holidayType, setHolidayType }) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <div className="flex gap-4 flex-wrap">
          {/* Country Selection */}
          <select value={country} onChange={(e) => setCountry(e.target.value)}
            className="border p-2 rounded">
            <option value="US">USA</option>
            <option value="IN">India</option>
            <option value="GB">UK</option>
          </select>
  
          {/* Year Selection */}
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)}
            min="2000" max="2100" className="border p-2 rounded" />
  
          {/* Month Selection */}
          <select value={month} onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded">
            <option value="">All Months</option>
            {[...Array(12).keys()].map(i => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
  
          {/* Holiday Type Selection */}
          <select value={holidayType} onChange={(e) => setHolidayType(e.target.value)}
            className="border p-2 rounded">
            <option value="">All Types</option>
            <option value="national">National</option>
            <option value="religious">Religious</option>
            <option value="observance">Observance</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default SearchForm;
  