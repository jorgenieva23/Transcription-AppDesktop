import { useState, useRef, useEffect } from "react";
import "./App.css"

declare global {
  interface Window {
    electronAPI: {
      onProgress: (callback: (msg: string) => void) => void;
      onComplete: (callback: (msg: string) => void) => void;
      onError: (callback: (err: string) => void) => void;
      showSaveDialog: () => Promise<string | undefined>;
      runTranscriptor: (inputPath: string, outputPath: string) => Promise<string>;
    };
  }
}

function App() {
  const [status, setStatus] = useState("Esperando archivo...");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.electronAPI.onProgress((msg) => {
      setStatus(msg);
      const match = msg.match(/(\d+)%/);
      if (match) setProgress(Number(match[1]));
    });

    window.electronAPI.onComplete((msg) => {
      setCompleted(true);
      setStatus(msg);
      setProgress(100);
    });

    window.electronAPI.onError((err) => {
      setStatus(`Error: ${err}`);
    });
  }, []);

  const handleRun = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return alert("Seleccioná un archivo primero");
    const inputPath =
      file && 'path' in file
        ? (file as File & { path: string }).path
        : file && 'name' in file
        ? (file as File).name
        : ""; // Para compatibilidad
    const output = await window.electronAPI.showSaveDialog();
    if (!output) return;

    setCompleted(false);
    setProgress(0);
    setStatus("Iniciando...");
    try {
      const result = await window.electronAPI.runTranscriptor(inputPath, output);
      setStatus(result);
    } catch (err) {
      setStatus("Error al transcribir");
    }
  };

  return (
    <div className="app">
      <h1>Transcriptor IA</h1>
      <input ref={fileRef} type="file" accept="video/*,audio/*" />
      <button onClick={handleRun}>Transcribir</button>

      <div className="progress-container">
        <p>{status}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        {completed && <p>✅ Listo</p>}
      </div>
    </div>
  );
}

export default App;
