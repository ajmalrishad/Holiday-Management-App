
const HolidayModal = ({ holiday, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-2">{holiday.name}</h2>
        <p><strong>Date:</strong> {holiday.date}</p>
        <p><strong>Type:</strong> {holiday.type}</p>
        <p><strong>Description:</strong> {holiday.description || "No Description Available"}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default HolidayModal;
