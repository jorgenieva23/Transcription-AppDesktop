import { useState, useEffect } from "react";

declare global {
  interface Window {
    electronAPI: {
      onProgress: (callback: (msg: string) => void) => void;
      onComplete: (callback: (msg: string) => void) => void;
      onError: (callback: (err: string) => void) => void;
      showSaveDialog: () => Promise<string | undefined>;
      runTranscriptor: (
        inputPath: string,
        outputPath: string
      ) => Promise<string>;
    //   minimizeWindow: () => void;
    //   maximizeRestoreWindow: () => void;
    //   closeWindow: () => void;
    };
  }
}

interface HistoryItem {
  id: string;
  name: string;
  progress: number;
  status: string;
  completed: boolean;
}

export function useTranscriptor() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const handleProgress = (msg: string) => {
      const match = msg.match(/(\d+)%/);
      const progress = match ? Number(match[1]) : 0;

      setHistory((prev) => {
        if (prev.length === 0) return prev;
        const first = prev[0];
        return [{ ...first, progress, status: msg }, ...prev.slice(1)];
      });
    };

    const handleComplete = (msg: string) => {
      setHistory((prev) => {
        if (prev.length === 0) return prev;
        const first = prev[0];
        return [
          { ...first, progress: 100, status: msg, completed: true },
          ...prev.slice(1),
        ];
      });
    };

    const handleError = (err: string) => {
      setHistory((prev) => {
        if (prev.length === 0) return prev;
        const first = prev[0];
        return [{ ...first, status: `Error: ${err}` }, ...prev.slice(1)];
      });
    };

    window.electronAPI.onProgress(handleProgress);
    window.electronAPI.onComplete(handleComplete);
    window.electronAPI.onError(handleError);
  }, []);

  const runTranscriptorProcess = async (file: File) => {
    const inputPath =
      "path" in file ? (file as File & { path: string }).path : "";
    const output = await window.electronAPI.showSaveDialog();
    if (!output) return;

    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      name: file.name,
      progress: 0,
      status: "Iniciando...",
      completed: false,
    };

    setHistory((prev) => [newItem, ...prev]);
    await window.electronAPI.runTranscriptor(inputPath, output);
  };

  return {
    history,
    runTranscriptorProcess,
  };
}
