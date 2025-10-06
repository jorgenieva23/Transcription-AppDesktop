import React, { useRef } from "react";

interface FileInputProps {
  onRun: (file: File) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onRun }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleRun = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return alert("Seleccioná un archivo primero");
    onRun(file);
    // Opcional: limpiar el input para poder seleccionar el mismo archivo de nuevo
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // Función para abrir el diálogo de selección de archivo al hacer clic en el botón estilizado
  const handleButtonClick = () => {
    fileRef.current?.click();
  };

  return (
    <div className="flex justify-end mb-6">
      {/* 1. El Input de archivo real (oculto) */}
      <input
        ref={fileRef}
        type="file"
        accept="video/*,audio/*"
        onChange={handleRun} // Dispara la lógica al seleccionar el archivo
        className="hidden" // Oculta el input de archivo feo por defecto
      />

      {/* 2. El botón estilizado con icono "+" que simula el clic en el input */}
      <button
        onClick={handleButtonClick}
        // Estilo del botón "Add/Plus" de la imagen
        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transition duration-150 ease-in-out"
        title="Seleccionar archivo para transcribir"
      >
        {/* Icono de Plus/Agregar */}
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Nuevo
      </button>
    </div>
  );
};
