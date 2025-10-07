import React from "react";
import { FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface ProgressCardProps {
  name: string;
  progress: number;
  status: string;
  completed: boolean;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  name,
  progress,
  status,
  completed,
}) => {
  let progressBarColor = "bg-gray-500";
  let statusIcon = <FaClock className="w-3 h-3 mr-1 text-gray-400" />;
  let statusTextColor = "text-gray-400";

  if (completed) {
    progressBarColor = "bg-green-500";
    statusIcon = <FaCheckCircle className="w-3 h-3 mr-1 text-green-500" />;
    statusTextColor = "text-green-500 font-medium";
  } else if (progress > 0 && progress < 100) {
    progressBarColor = "bg-blue-500";
    statusIcon = (
      <FaClock className="w-3 h-3 mr-1 text-blue-400 animate-spin" />
    );
    statusTextColor = "text-blue-400";
  } else if (status.includes("Error")) {
    progressBarColor = "bg-red-500";
    statusIcon = (
      <FaExclamationTriangle className="w-3 h-3 mr-1 text-red-500" />
    );
    statusTextColor = "text-red-500";
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-xl border border-gray-600 transition-shadow hover:shadow-2xl">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-gray-100 font-medium truncate max-w-[70%] text-base">
          {name}
        </h3>

        {completed ? (
          <span className="text-green-500 text-xl ml-2">✅</span>
        ) : progress > 0 ? (
          <span className="text-sm text-gray-400">{progress}%</span>
        ) : (
          <span className="text-sm font-semibold text-gray-300">En espera</span>
        )}
      </div>

      <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden mb-1">
        <div
          style={{ width: `${progress}%` }}
          className={`h-full transition-all duration-500 ease-out ${progressBarColor}`}
        ></div>
      </div>

      <p className={`flex items-center text-xs italic ${statusTextColor}`}>
        {statusIcon}
        {status}
      </p>
    </div>
  );
};
