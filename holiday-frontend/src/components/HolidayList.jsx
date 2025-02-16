import { useState, useEffect } from "react";
import HolidayModal from "./HolidayModal";

const HolidayList = ({ holidays }) => {
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Step 1: Filter holidays based on search query
  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔹 Step 2: Calculate total pages dynamically
  const totalPages = Math.ceil(filteredHolidays.length / itemsPerPage);

  // 🔹 Step 3: Ensure the current page doesn't exceed available pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // 🔹 Step 4: Paginate the filtered list
  const paginatedHolidays = filteredHolidays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search holidays (e.g., Christmas)"
        className="w-full p-2 mb-2 border rounded"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
      />

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Date</th>
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {paginatedHolidays.length > 0 ? (
            paginatedHolidays.map((holiday, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedHoliday(holiday)}
              >
                <td className="p-2">{holiday.date.iso}</td>
                <td className="p-2">{holiday.name}</td>
                <td className="p-2">{holiday.type.join(", ")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">No holidays found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Holiday Modal */}
      {selectedHoliday && (
        <HolidayModal
          holiday={selectedHoliday}
          onClose={() => setSelectedHoliday(null)}
        />
      )}
    </div>
  );
};

export default HolidayList;
