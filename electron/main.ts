import path from "path";
import { fileURLToPath } from "url";
import { initializeTranscriptorHandlers } from "./transcriptorHandlers";
import { app, BrowserWindow, ipcMain, dialog } from "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    icon: app.isPackaged
      ? path.join(process.resourcesPath, "build", "icon.ico")
      : path.join(__dirname, "../build/icon.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.removeMenu();

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }

  initializeTranscriptorHandlers(win);
}

app.whenReady().then(createWindow);

ipcMain.handle("show-save-dialog", async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Guardar transcripción",
    defaultPath: "transcripcion.docx",
    filters: [{ name: "Word Document", extensions: ["docx"] }],
  });
  return canceled ? null : filePath;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
