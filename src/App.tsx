import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/electron-vite.animate.svg";
import "./App.css";

type ElectronAPI = {
  runTranscriptor: (file: string, outputPath: string) => Promise<string>;
  showSaveDialog: () => Promise<string | undefined>;
};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

function App() {
  const [count, setCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTranscribir = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Seleccioná un archivo primero");
      return;
    }

    // Pedir ruta de guardado al usuario
    const outputPath = await window.electronAPI.showSaveDialog();
    if (!outputPath) return;

    try {
      const result = await window.electronAPI.runTranscriptor(
        file.path,
        outputPath
      );
      alert(result);
    } catch (err) {
      alert("Ocurrió un error, revisá la consola");
    }
  };

  return (
    <>
      <div>
        <a href="https://electron-vite.github.io" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <input type="file" ref={fileInputRef} accept="video/*,audio/*" />
        <button onClick={handleTranscribir}>Transcribir video/audio</button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
