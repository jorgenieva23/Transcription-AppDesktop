import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/electron-vite.animate.svg";
import "./App.css";

type ElectronAPI = {
  runTranscriptor: (file: string) => Promise<string>;
};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

function App() {
  const [count, setCount] = useState(0);

  const handleTranscribir = async () => {
    try {
      console.log("window.electronAPI:", window.electronAPI);
      const result = await window.electronAPI.runTranscriptor("miArchivo.docx");
      console.log("RESULTADO:", result);
      alert(result);
    } catch (err) {
      console.error("ERROR:", err);
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

        {/* 👇 Tu botón para lanzar Python */}
        <button onClick={handleTranscribir}>Transcribir video</button>

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
