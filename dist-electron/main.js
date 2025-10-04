import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { app, ipcMain, dialog, BrowserWindow } from "electron";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1e3,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }
}
app.whenReady().then(createWindow);
ipcMain.handle("show-save-dialog", async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Guardar transcripción",
    defaultPath: "transcripcion.docx",
    // 👈 cambia esto
    filters: [{ name: "Word Document", extensions: ["docx"] }]
  });
  return canceled ? null : filePath;
});
ipcMain.handle(
  "run-transcriptor",
  async (event, inputPath, outputPath) => {
    const win2 = BrowserWindow.getFocusedWindow();
    const exePath = path.join(__dirname, "../python/dist/transcription.exe");
    const pythonExe = path.join(__dirname, "../python/venv/Scripts/python.exe");
    const args = app.isPackaged ? [inputPath, outputPath] : [path.join(__dirname, "../python/transcription.py"), inputPath, outputPath];
    const py = spawn(app.isPackaged ? exePath : pythonExe, args, {
      cwd: path.join(__dirname, "../python")
    });
    py.stdout.on("data", (data) => {
      const msg = data.toString();
      console.log(msg);
      win2 == null ? void 0 : win2.webContents.send("transcriptor-progress", msg);
    });
    py.stderr.on("data", (data) => {
      win2 == null ? void 0 : win2.webContents.send("transcriptor-error", data.toString());
    });
    py.on("close", (code) => {
      win2 == null ? void 0 : win2.webContents.send(
        "transcriptor-complete",
        code === 0 ? "✅ Completado" : ""
      );
    });
  }
);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
