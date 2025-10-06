import React from "react";
import { ProgressCard } from "./ProgressCard";

// (Asumo que HistoryItem está definido en useTranscriptor o se ha movido aquí)
interface HistoryItem {
  id: string;
  name: string;
  progress: number;
  status: string; // Incluimos 'status' para usarlo en ProgressCard
  completed: boolean;
}

interface HistoryProps {
  items: HistoryItem[];
}

export const History: React.FC<HistoryProps> = ({ items }) => {
  return (
    // Contenedor simple para la lista de tarjetas
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">
        Historial de Transcripción
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500 italic">
          No hay transcripciones en curso o completadas.
        </p>
      ) : (
        items.map((item) => (
          <ProgressCard
            key={item.id}
            name={item.name}
            progress={item.progress}
            status={item.status} // Pasamos el status
            completed={item.completed}
          />
        ))
      )}
    </div>
  );
};
