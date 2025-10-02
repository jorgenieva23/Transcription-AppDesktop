import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";

// 🔹 Fix __dirname y __filename en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win: BrowserWindow | null = null;

// 🔹 Crear ventana principal
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }
}

// Ejecutar al iniciar la app
app.whenReady().then(createWindow);

// 🔹 IPC para ejecutar el script Python o el EXE
ipcMain.handle("run-transcriptor", async (_, outputFile: string) => {
  return new Promise((resolve, reject) => {
    // 🔹 Ruta al EXE standalone (producción)
    const exePath = path.join(__dirname, "../python/dist/transcription.exe");

    // 🔹 En desarrollo: se puede usar Python + script
    const pythonExe = path.join(__dirname, "../python/venv/Scripts/python.exe");
    // o ruta al venv si querés

    // 🔹 Argumentos según si estamos en producción o desarrollo
    const args = app.isPackaged
      ? [outputFile || "transcripcion.docx"] // EXE solo recibe output
      : [
          path.join(__dirname, "../python/transcription.py"),
          outputFile || "transcripcion.docx",
        ];

    // 🔹 Ejecutar proceso
    const py = spawn(app.isPackaged ? exePath : pythonExe, args, {
      cwd: path.join(__dirname, "../python"),
    });

    let stdout = "";
    let stderr = "";

    // Captura stdout
    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    // Captura errores
    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // Termina proceso
    py.on("close", (code) => {
      if (code === 0) {
        resolve(stdout || "✅ Transcripción completada");
      } else {
        reject(
          new Error(`❌ Error al ejecutar Python/EXE (code ${code})\n${stderr}`)
        );
      }
    });
  });
});

// Cerrar app cuando se cierren todas las ventanas (excepto macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
