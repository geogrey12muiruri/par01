import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Carousel from "../../components/common/Carousel";

const measurementForms = {
  blazer: ["Chest", "Waist", "Shoulder", "Sleeve Length"],
  trouser: ["Waist", "Inseam", "Hip", "Thigh"],
  shirt: ["Neck", "Chest", "Waist", "Sleeve Length"],
  halfcoat: ["Chest", "Waist", "Shoulder", "Sleeve Length"],
  dress: ["Bust", "Waist", "Hip", "Length"],
  skirt: ["Waist", "Hip", "Length"],
};

const HomePage = ({ authUser }) => {
  const [selectedApparel, setSelectedApparel] = useState("blazer");
  const [measurements, setMeasurements] = useState({
    blazer: {},
    trouser: {},
    shirt: {},
    halfcoat: {},
    dress: {},
    skirt: {},
  });

  const handleApparelSelect = (apparel) => {
    setSelectedApparel(apparel);
  };

  const handleMeasurementChange = (e, measurement) => {
    const value = e.target.value;
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [selectedApparel]: {
        ...prevMeasurements[selectedApparel],
        [measurement]: value,
      },
    }));
  };

  const handleMeasurementSubmit = async (e) => {
	e.preventDefault();
  
	const dataToSend = measurements[selectedApparel]; // Assuming selectedApparel is defined correctly
  
	try {
	  const response = await axios.put(`/api/users/update-measurements`, {
		measurements: dataToSend,
		selectedApparel: selectedApparel, // Pass selectedApparel to backend
	  });
  
	  console.log("Measurement submission response:", response.data);
	  // Handle success feedback or redirect
	} catch (error) {
	  console.error("Error submitting measurements:", error.message);
	  // Handle error scenarios
	}
  };
  

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="profile-icon.png" // Replace with actual profile icon
            alt="Profile Icon"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-lg font-semibold">
            Welcome, {authUser.username}
          </span>{" "}
          {/* Replace with actual username */}
        </div>
        <button className="text-gray-300 hover:text-white">Logout</button>
      </header>

      {/* Main Content */}
      <div className="flex flex-[4_4_0]">
        {/* Left Sidebar (Carousel) */}
        <div className="w-full lg:w-1/4">
          <Carousel />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-3/4 px-4">
          {/* Display current measurements */}
          <div className="mt-4 flex overflow-x-auto">
            {Object.keys(measurements).map((apparel) => (
              <button
                key={apparel}
                className={`bg-gray-800 text-white rounded-lg px-4 py-2 mr-4 ${
                  selectedApparel === apparel ? "bg-blue-700" : ""
                }`}
                onClick={() => setSelectedApparel(apparel)}
              >
                {apparel}
              </button>
            ))}
          </div>

          {/* Measurement Form */}
          {selectedApparel && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold capitalize">
                {selectedApparel} Measurements
              </h2>
              <form
                onSubmit={handleMeasurementSubmit}
                className="space-y-4 mt-4"
              >
                {measurementForms[selectedApparel].map((measurement) => (
                  <div key={measurement} className="flex flex-col">
                    <label className="text-gray-300">{measurement}</label>
                    <input
                      type="text"
                      className="bg-gray-800 text-white rounded-lg px-4 py-2 mt-2"
                      value={measurements[selectedApparel][measurement] || ""}
                      onChange={(e) => handleMeasurementChange(e, measurement)}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-4"
                >
                  Submit Measurements
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <nav className="bg-gray-800 text-white fixed bottom-0 left-0 right-0 flex justify-around py-2">
        <button className="hover:text-gray-300">Orders</button>
        <button className="hover:text-gray-300">Products</button>
        <button className="hover:text-gray-300">Accounts</button>
        <button className="hover:text-gray-300">Measurements</button>
      </nav>
    </div>
  );
};

export default HomePage;
