import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { app, ipcMain, BrowserWindow } from "electron";
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
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }
}
app.whenReady().then(createWindow);
ipcMain.handle("run-transcriptor", async (_, outputFile) => {
  return new Promise((resolve, reject) => {
    const exePath = path.join(__dirname, "../python/dist/transcription.exe");
    const pythonExe = path.join(__dirname, "../python/venv/Scripts/python.exe");
    const args = app.isPackaged ? [outputFile || "transcripcion.docx"] : [
      path.join(__dirname, "../python/transcription.py"),
      outputFile || "transcripcion.docx"
    ];
    const py = spawn(app.isPackaged ? exePath : pythonExe, args, {
      cwd: path.join(__dirname, "../python")
    });
    let stdout = "";
    let stderr = "";
    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    py.on("close", (code) => {
      if (code === 0) {
        resolve(stdout || "✅ Transcripción completada");
      } else {
        reject(
          new Error(`❌ Error al ejecutar Python/EXE (code ${code})
${stderr}`)
        );
      }
    });
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
