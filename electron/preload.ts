import { contextBridge, ipcRenderer } from "electron";

interface ElectronAPI {
  runTranscriptor: (inputPath: string, outputPath: string) => Promise<void>;
  showSaveDialog: () => Promise<string | undefined>;
}

contextBridge.exposeInMainWorld("electronAPI", {
  runTranscriptor: (inputPath: string, outputPath: string): Promise<void> =>
    ipcRenderer.invoke("run-transcriptor", inputPath, outputPath),
  showSaveDialog: (): Promise<string | undefined> => ipcRenderer.invoke("show-save-dialog"),
} as ElectronAPI);