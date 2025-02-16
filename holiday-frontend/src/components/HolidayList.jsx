import { useState } from "react";
import HolidayModal from "./HolidayModal";

const HolidayList = ({ holidays }) => {
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Date</th>
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr key={index} className="border-b cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedHoliday(holiday)}>
              <td className="p-2">{holiday.date.iso}</td>
              <td className="p-2">{holiday.name}</td>
              <td className="p-2">{holiday.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedHoliday && (
        <HolidayModal holiday={selectedHoliday} onClose={() => setSelectedHoliday(null)} />
      )}
    </div>
  );
};

export default HolidayList;
