"use strict";
const electron = require("electron");
console.log("⚡ Preload cargado correctamente");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  runTranscriptor: (file) => electron.ipcRenderer.invoke("run-transcriptor", file)
});
