import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import blazerImage from "../../assets/blazer.svg";
import trouserImage from "../../assets/trousers.svg";
import shirtImage from "../../assets/shirt.svg";
import halfcoatImage from "../../assets/halfcoat.svg";
import dressImage from "../../assets/dress.svg";
import skirtImage from "../../assets/skirt.svg";

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

const MeasurementsSection = ({ measurements, setMeasurements }) => {
  const [selectedApparel, setSelectedApparel] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Your Measurements</h2>
      <div className="overflow-x-auto flex space-x-4 mt-4">
        {Object.keys(measurements).map((apparel) => (
          <div key={apparel} className="bg-gray-800 text-white rounded-lg p-4 w-64">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold capitalize">{apparel}</h3>
              <button
                onClick={() => handleApparelSelect(apparel)}
                className="bg-blue-600 text-white rounded-lg px-4 py-1 text-sm"
              >
                Edit
              </button>
            </div>
            <ul>
              {Object.entries(measurements[apparel]).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span>{key}:</span> <span>{value}</span>
                </li>
              ))}
            </ul>
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
  );
};

export default MeasurementsSection;
