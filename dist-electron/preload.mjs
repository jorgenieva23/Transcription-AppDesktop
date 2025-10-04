"use strict";
const electron = require("electron");
const electronAPI = {
  runTranscriptor: (inputPath, outputPath) => electron.ipcRenderer.invoke("run-transcriptor", inputPath, outputPath),
  showSaveDialog: () => electron.ipcRenderer.invoke("show-save-dialog"),
  onProgress: (callback) => electron.ipcRenderer.on("transcriptor-progress", (_, data) => callback(data)),
  onComplete: (callback) => electron.ipcRenderer.on("transcriptor-complete", (_, data) => callback(data)),
  onError: (callback) => electron.ipcRenderer.on("transcriptor-error", (_, data) => callback(data))
};
electron.contextBridge.exposeInMainWorld("electronAPI", electronAPI);
