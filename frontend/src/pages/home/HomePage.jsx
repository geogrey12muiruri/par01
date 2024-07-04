import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import blazerImage from "../../assets/blazer.svg";
import trouserImage from "../../assets/trousers.svg";
import shirtImage from "../../assets/shirt.svg";
import halfcoatImage from "../../assets/halfcoat.svg";
import dressImage from "../../assets/dress.svg";
import skirtImage from "../../assets/skirt.svg";
import ThreePieceImage from "../../assets/three.jpg";

// Add your popular designs here
const popularDesigns = [
  { image: ThreePieceImage, description: "Three Piece classic blue" },
  { image: trouserImage, description: "Stylish Trousers" },
  { image: shirtImage, description: "Formal Shirt" },
  { image: halfcoatImage, description: "Elegant Halfcoat" },
  { image: dressImage, description: "Beautiful Dress" },
  { image: skirtImage, description: "Chic Skirt" },
];

const measurementForms = {
  blazer: ["Chest", "Waist", "Shoulder", "Sleeve Length"],
  trouser: ["Waist", "Inseam", "Hip", "Thigh"],
  shirt: ["Neck", "Chest", "Waist", "Sleeve Length"],
  halfcoat: ["Chest", "Waist", "Shoulder", "Sleeve Length"],
  dress: ["Bust", "Waist", "Hip", "Length"],
  skirt: ["Waist", "Hip", "Length"],
};

const apparelImages = {
  blazer: blazerImage,
  trouser: trouserImage,
  shirt: shirtImage,
  halfcoat: halfcoatImage,
  dress: dressImage,
  skirt: skirtImage,
};

const HomePage = ({ authUser }) => {
  const [selectedApparel, setSelectedApparel] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(true);
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

    const dataToSend = measurements[selectedApparel];

    try {
      const response = await axios.put(`/api/users/update-measurements`, {
        measurements: dataToSend,
        selectedApparel: selectedApparel,
      });

      if (response.status === 200) {
        toast.success("Measurements added successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error submitting measurements");
      }
      console.error("Error submitting measurements:", error.message);
    }
  };

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <Toaster />
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
          </span>
        </div>
        <button className="text-gray-300 hover:text-white">Logout</button>
      </header>

      {/* Main Content */}
      <div className="flex flex-[4_4_0] ">
        {/* Left Sidebar (Carousel) */}

        {/* Right Content */}
        <div className="w-full lg:w-3/4 px-4 p-6">
          {/* Display current measurements */}
          <div className="mt-4 flex overflow-x-auto">
            {Object.keys(measurements).map((apparel) => (
              <button
                key={apparel}
                className={`bg-gray-800 text-white rounded-lg px-4 py-2 mr-4 ${
                  selectedApparel === apparel ? "bg-blue-700" : ""
                }`}
                onClick={() => handleApparelSelect(apparel)}
              >
                {apparel}
              </button>
            ))}
          </div>

          {/* Grid display of popular designs */}
          <h4 className='text-white text-center p-4'>Checkout Our Top Designs</h4>
          <div className="mt-4 flex overflow-x-auto space-x-4">
            
            {popularDesigns.map((design, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white rounded-lg p-4 flex-shrink-0"
                style={{ minWidth: "200px" }}
              >
                <img
                  src={design.image}
                  alt={design.description}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-center">{design.description}</p>
              </div>
            ))}
          </div>

          {/* Apparel Image and Measurement Form */}
          {showForm && selectedApparel && (
            <>
              {/* Apparel Image */}
              <div className="mt-4 flex justify-center bg-orange-500 rounded-xl shadow-lg shadow-orange-500/50 bg-opacity-75">
                <img
                  src={apparelImages[selectedApparel]}
                  alt={`${selectedApparel} model`}
                  className="w-1/2"
                />
              </div>

              {/* Measurement Form */}
              <div className="mt-4 p-6 ">
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
                        onChange={(e) =>
                          handleMeasurementChange(e, measurement)
                        }
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
            </>
          )}
        </div>
      </div>

      {/* Bottom Tab Navigation */}
 
    </div>
  );
};

export default HomePage;