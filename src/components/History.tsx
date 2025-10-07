import React from "react";
import { ProgressCard } from "./ProgressCard";
import { FaArrowUp } from "react-icons/fa";

interface HistoryItem {
  id: string;
  name: string;
  progress: number;
  status: string;
  completed: boolean;
}

interface HistoryProps {
  items: HistoryItem[];
}

export const History: React.FC<HistoryProps> = ({ items }) => {
  return (
    <div className="space-y-4 flex-grow">
      <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
        Historial de Transcripciones
      </h2>
      {items.length === 0 ? (
        <div className="text-center p-8 bg-gray-700/50 rounded-lg border border-gray-600">
          <FaArrowUp className="w-6 h-6 mb-3 text-blue-400 mx-auto animate-bounce" />
          <p className="text-gray-400 italic mb-1">
            No hay transcripciones en curso o completadas.
          </p>
          <p className="text-sm text-gray-300 font-medium">
            ¡Arrastra un archivo o haz click en **"Cargar Archivo"** arriba para
            empezar!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <ProgressCard
              key={item.id}
              name={item.name}
              progress={item.progress}
              status={item.status}
              completed={item.completed}
            />
          ))}
        </div>
      )}
    </div>
  );
};
