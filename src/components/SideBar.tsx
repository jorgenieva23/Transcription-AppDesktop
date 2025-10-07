import { useState } from "react";
import {
  FaChevronDown,
  FaTachometerAlt,
  FaFileVideo,
  FaInfoCircle,
} from "react-icons/fa";

const WHISPER_MODELS = [
  {
    name: "tiny",
    label: "Tiny",
    description: "Muy rápido. Bajo uso de recursos, baja precisión.",
    speed: "⚡️⚡️⚡️",
  },
  {
    name: "base",
    label: "Base",
    description: "Rápido. Balance entre velocidad y precisión.",
    speed: "⚡️⚡️",
  },
  {
    name: "small",
    label: "Small",
    description: "Moderado. Alta precisión, ideal para contenido general.",
    speed: "⚡️",
  },
  {
    name: "medium",
    label: "Medium",
    description:
      "Lento. Muy alta precisión, recomendado para contenido crítico.",
    speed: "🐢",
  },
  {
    name: "large",
    label: "Large",
    description: "El más lento. Máxima precisión, pero consume más recursos.",
    speed: "🐌",
  },
  {
    name: "turbo",
    label: "Turbo",
    description: "Extremadamente rápido (si es una optimización local).",
    speed: "🚀🚀🚀🚀",
  },
];

interface SideBarProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const SideBar = ({ selectedModel, setSelectedModel }: SideBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    setIsDropdownOpen(false);
  };

  const currentModel =
    WHISPER_MODELS.find((m) => m.name === selectedModel) || WHISPER_MODELS[1];

  return (
    <nav className="w-64 bg-gray-800 rounded-xl p-4 mr-6 flex flex-col shadow-2xl">
      <div
        className="flex items-center text-blue-400 p-3 rounded-lg bg-gray-700 font-semibold cursor-default mb-4"
        title="Estás en la sección de transcripción de archivos."
      >
        <FaFileVideo className="w-6 h-6 mr-3" />
        Transcripción
      </div>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-150 border ${
            isDropdownOpen
              ? "text-blue-400 bg-gray-700 border-blue-500"
              : "text-gray-300 border-gray-700"
          }`}
          title="Seleccionar el modelo de IA para la transcripción"
        >
          <div className="flex items-center">
            <FaTachometerAlt className="w-5 h-5 mr-3" />
            <span className="font-medium">Modelo: {currentModel.label}</span>
          </div>
          <FaChevronDown
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div
            className="absolute z-20 w-full bg-gray-700 rounded-lg shadow-xl mt-1 py-1 border border-gray-600 max-h-80 overflow-y-auto"
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {WHISPER_MODELS.map((model) => (
              <button
                key={model.name}
                onClick={() => handleModelChange(model.name)}
                className={`block w-full text-left px-3 py-2 transition-colors duration-100 border-l-4 ${
                  model.name === selectedModel
                    ? "bg-blue-600 text-white font-medium border-blue-400"
                    : "text-gray-200 hover:bg-gray-600 border-transparent"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{model.label}</span>
                  <span className="text-sm">{model.speed}</span>
                </div>
                <p
                  className={`text-xs mt-0.5 ${
                    model.name === selectedModel
                      ? "text-blue-100"
                      : "text-gray-400"
                  }`}
                >
                  {model.description}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-3 text-xs text-gray-400 border-t border-gray-700 pt-4">
        <div className="flex items-end mb-1 font-medium text-gray-300">
          <FaInfoCircle className="w-4 h-4 mr-2" />
          Acerca de los modelos
        </div>
        Los modelos más grandes son más precisos pero requieren más tiempo y
        recursos del sistema.
      </div>
    </nav>
  );
};
