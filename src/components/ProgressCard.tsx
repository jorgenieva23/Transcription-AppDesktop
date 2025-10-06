import React from "react";

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
  // Clase condicional para el color de la barra
  const progressBarColor = completed
    ? "bg-green-500" // Verde cuando está completo
    : progress > 0
    ? "bg-blue-500" // Azul cuando está en progreso
    : "bg-gray-500"; // Gris si aún no ha iniciado

  return (
    // Tarjeta con fondo gris oscuro, padding y esquinas redondeadas
    <div className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
      {/* Cabecera: Nombre y Check de completado */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-gray-100 font-medium truncate max-w-[80%]">
          {name}
        </h3>
        {/* Símbolo de completado (Check Verde) */}
        {completed && <span className="text-green-500 text-xl ml-2">✅</span>}
        {/* Muestra el porcentaje si no está completo */}
        {!completed && progress > 0 && (
          <span className="text-sm text-gray-400">{progress}%</span>
        )}
      </div>

      <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden mb-1">
        <div
          style={{ width: `${progress}%` }}
          className={`h-full transition-all duration-500 ease-out ${progressBarColor}`}
        ></div>
      </div>

      {/* Estado/Mensaje de la operación */}
      <p className="text-xs text-gray-400 italic">{status}</p>
    </div>
  );
};
