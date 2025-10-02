import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  runTranscriptor: (file: string) =>
    ipcRenderer.invoke("run-transcriptor", file),
});
