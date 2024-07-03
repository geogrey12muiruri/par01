import React from "react";

const Segmentation = ({ options, selected, onSelect }) => {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      {options.map((option) => (
        <button
          key={option}
          className={`btn btn-outline ${
            selected === option ? "bg-primary text-white" : ""
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Segmentation;
