import React, { useRef, useState, useCallback } from "react";
import { FaUpload, FaFileImport } from "react-icons/fa";

interface FileInputProps {
  onRun: (file: File) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onRun }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(
    (file: File | undefined) => {
      if (!file) return alert("Seleccioná un archivo primero");

      if (!file.type.match(/video|audio/)) {
        alert(
          "Tipo de archivo no soportado. Por favor, selecciona un video o audio."
        );
        return;
      }

      onRun(file);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    },
    [onRun]
  );

  const handleRun = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleButtonClick = () => {
    fileRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <input
        ref={fileRef}
        type="file"
        accept="video/*,audio/*"
        onChange={handleRun}
        className="hidden"
      />

      <div
        className={`w-full p-10 mb-4 border-4 border-dashed rounded-xl transition-colors duration-200 ${
          isDragging
            ? "border-blue-500 bg-gray-700/50"
            : "border-gray-600 hover:border-blue-500 bg-gray-700/30"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        title="Arrastra y suelta o haz click para seleccionar un archivo"
      >
        <div className="flex flex-col items-center text-center">
          <FaUpload
            className={`w-8 h-8 mb-3 transition-colors duration-200 ${
              isDragging ? "text-blue-400" : "text-gray-400"
            }`}
          />
          <p className="text-gray-200 font-semibold mb-1">
            Arrastra y suelta tu archivo de Video/Audio aquí
          </p>
          <p className="text-sm text-gray-400">o</p>
          <button
            type="button"
            className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-150"
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            <FaFileImport className="inline w-4 h-4 mr-2" />
            Cargar Archivo
          </button>
          <p className="mt-3 text-xs text-gray-500">
            Archivos soportados: MP4, MOV, MP3, WAV, etc. (Video o Audio)
          </p>
        </div>
      </div>
    </div>
  );
};
