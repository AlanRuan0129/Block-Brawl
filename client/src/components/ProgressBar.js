import React from "react";

const ProgressBar = ({ currentTime, maxTime }) => {
  // Calculate the width of the progress bar as a percentage
  const widthPercentage = (currentTime / maxTime) * 100;

  // Determine the color of the progress bar based on remaining time
  const getProgressColor = (currentTime, maxTime) => {
    const ratio = currentTime / maxTime;
    if (ratio > 0.5) return "bg-purple-300"; // More than 50% remaining
    if (ratio > 0.25) return "bg-yellow-500"; // Between 25% and 50% remaining
    return "bg-red-500"; // Less than 25% remaining
  };

  const progressBarColor = getProgressColor(currentTime, maxTime);

  return (
    <div className="w-full bg-gray-200 h-5 rounded-lg overflow-hidden">
      {" "}
      {/* Container for the progress bar */}
      <div
        className={`h-5 ${progressBarColor} rounded-lg transition-all ease-linear`}
        style={{ width: `${widthPercentage}%` }} // The actual progress bar
      />
    </div>
  );
};

//export default ProgressBar;
export { ProgressBar };
