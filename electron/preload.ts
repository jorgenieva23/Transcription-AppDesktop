import { contextBridge, ipcRenderer } from "electron";

interface ElectronAPI {
  runTranscriptor: (inputPath: string, outputPath: string) => Promise<string>;
  showSaveDialog: () => Promise<string | undefined>;
  onProgress: (callback: (data: string) => void) => void;
  onComplete: (callback: (data: string) => void) => void;
  onError: (callback: (data: string) => void) => void;
}

const electronAPI: ElectronAPI = {
  runTranscriptor: (inputPath, outputPath) =>
    ipcRenderer.invoke("run-transcriptor", inputPath, outputPath),
  showSaveDialog: () => ipcRenderer.invoke("show-save-dialog"),
  onProgress: (callback) =>
    ipcRenderer.on("transcriptor-progress", (_, data) => callback(data)),
  onComplete: (callback) =>
    ipcRenderer.on("transcriptor-complete", (_, data) => callback(data)),
  onError: (callback) =>
    ipcRenderer.on("transcriptor-error", (_, data) => callback(data)),
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);