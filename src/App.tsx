import { FileInput } from "./components/FileInput";
import { History } from "./components/History";
import { useTranscriptor } from "./hooks/useTranscriptor";
// ... (Declaraciones globales y el resto del código TS se mantiene igual)

function App() {
  const { history, runTranscriptorProcess } = useTranscriptor();

  const handleRun = (file: File) => {
    runTranscriptorProcess(file);
  };

  return (
    // Estilo principal: color de fondo oscuro y estructura de la app
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Barra de título simplificada (solo el título) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-100">Transcriptor IA</h1>
        {/* Aquí irían los botones de minimizar/cerrar si fuera Electron, pero los omitimos por simplicidad en React */}
      </div>

      {/* Contenido principal (similar al diseño de dos columnas de la imagen) */}
      <div className="flex flex-grow overflow-hidden">
        {/* Columna de navegación/opciones (Panel izquierdo) */}

        {/* Columna de contenido (Panel derecho con FileInput y History) */}
        <main className="flex-grow bg-gray-800 rounded-lg p-6 overflow-y-auto">
          {/* Componente FileInput con el nuevo estilo de botón/icono */}
          <FileInput onRun={handleRun} />

          {/* La lista de historial y progreso (similar a la imagen) */}
          <History items={history} />
        </main>
      </div>
    </div>
  );
}

export default App;


// import { FileInput } from "./components/FileInput";
// import { History } from "./components/History";
// import { useTranscriptor } from "./hooks/useTranscriptor";
// import { AiTranscriptIcon } from "./components/AiTranscriptIcon"; // Asegúrate de tener este componente
// // ... (Declaraciones globales y el resto del código TS se mantiene igual)

// function App() {
//   const { history, runTranscriptorProcess } = useTranscriptor();

//   const handleRun = (file: File) => {
//     runTranscriptorProcess(file);
//   };

//   // Handlers para los botones de la barra de título
//   const handleMinimize = () => {
//     window.electronAPI.minimizeWindow();
//   };

//   const handleMaximizeRestore = () => {
//     window.electronAPI.maximizeRestoreWindow();
//   };

//   const handleClose = () => {
//     window.electronAPI.closeWindow();
//   };

//   return (
//     // Contenedor principal de la aplicación, ahora sin el p-4 inicial
//     <div className="flex flex-col h-screen bg-gray-900 text-white">
//       {/* BARRA DE TÍTULO PERSONALIZADA */}
//       <div
//         className="flex justify-between items-center bg-gray-800 p-2 pl-4 pr-2 border-b border-gray-700 select-none"
//         style={{ WebkitAppRegion: "drag" }} // Permite arrastrar la ventana
//       >
//         <div
//           className="flex items-center"
//           style={{ WebkitAppRegion: "no-drag" }}
//         >
//           {/* Aquí puedes usar el ícono que generamos */}
//           <AiTranscriptIcon className="w-6 h-6 mr-2" />
//           <h1 className="text-lg font-semibold text-gray-200">Lexis AI</h1>
//         </div>

//         {/* Botones de Control de Ventana */}
//         <div className="flex" style={{ WebkitAppRegion: "no-drag" }}>
//           <button
//             onClick={handleMinimize}
//             className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-700 rounded-md transition-colors duration-150"
//             title="Minimizar"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M20 12H4"
//               ></path>
//             </svg>
//           </button>
//           <button
//             onClick={handleMaximizeRestore}
//             className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-700 rounded-md transition-colors duration-150"
//             title="Maximizar/Restaurar"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"
//               ></path>
//             </svg>
//           </button>
//           <button
//             onClick={handleClose}
//             className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white rounded-md transition-colors duration-150"
//             title="Cerrar"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Contenido principal de la app (ahora con un p-4 para el padding general) */}
//       <div className="flex flex-grow overflow-hidden p-4">
//         {" "}
//         {/* Añadimos el padding aquí */}
//         {/* Columna de navegación/opciones (Panel izquierdo) */}
//         {/* Columna de contenido (Panel derecho con FileInput y History) */}
//         <main className="flex-grow bg-gray-800 rounded-lg p-6 overflow-y-auto">
//           {/* Componente FileInput con el nuevo estilo de botón/icono */}
//           <FileInput onRun={handleRun} />

//           {/* La lista de historial y progreso (similar a la imagen) */}
//           <History items={history} />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
