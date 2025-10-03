"use strict";const r=require("electron");r.contextBridge.exposeInMainWorld("electronAPI",{runTranscriptor:e=>r.ipcRenderer.invoke("run-transcriptor",e)});
