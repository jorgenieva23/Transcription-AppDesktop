import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { app, BrowserWindow, ipcMain, dialog } from "electron";

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
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }
}

// Ejecutar al iniciar la app
app.whenReady().then(createWindow);

// 🔹 IPC para ejecutar el script Python o el EXE
ipcMain.handle("show-save-dialog", async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Guardar transcripción",
    defaultPath: "transcripcion.docx", // 👈 cambia esto
    filters: [{ name: "Word Document", extensions: ["docx"] }],
  });
  return canceled ? null : filePath;
});

// ipcMain.handle(
//   "run-transcriptor",
//   async (_, inputPath: string, outputPath: string) => {
//     return new Promise((resolve, reject) => {
//       const exePath = path.join(__dirname, "../python/dist/transcription.exe");

//       const pythonExe = path.join(
//         __dirname,
//         "../python/venv/Scripts/python.exe"
//       );

//       const args = app.isPackaged
//         ? [inputPath, outputPath]
//         : [
//             path.join(__dirname, "../python/transcription.py"),
//             inputPath,
//             outputPath,
//           ];

//       const py = spawn(app.isPackaged ? exePath : pythonExe, args, {
//         cwd: path.join(__dirname, "../python"),
//       });

//       let stdout = "";
//       let stderr = "";

//       py.stdout.on("data", (data) => {
//         stdout += data.toString();
//       });

//       py.stderr.on("data", (data) => {
//         stderr += data.toString();
//       });

//       py.on("close", (code) => {
//         if (code === 0) {
//           resolve(stdout || "✅ Transcripción completada");
//         } else {
//           reject(
//             new Error(
//               `❌ Error al ejecutar Python/EXE (code ${code})\n${stderr}`
//             )
//           );
//         }
//       });
//     });
//   }
// );

ipcMain.handle(
  "run-transcriptor",
  async (event, inputPath: string, outputPath: string) => {
    const win = BrowserWindow.getFocusedWindow();
    const exePath = path.join(__dirname, "../python/dist/transcription.exe");
    const pythonExe = path.join(__dirname, "../python/venv/Scripts/python.exe");

    const args = app.isPackaged
      ? [inputPath, outputPath]
      : [path.join(__dirname, "../python/transcription.py"), inputPath, outputPath];

    const py = spawn(app.isPackaged ? exePath : pythonExe, args, {
      cwd: path.join(__dirname, "../python"),
    });

    py.stdout.on("data", (data) => {
      const msg = data.toString();
      console.log(msg);
      // Envía mensaje a React
      win?.webContents.send("transcriptor-progress", msg);
    });

    py.stderr.on("data", (data) => {
      win?.webContents.send("transcriptor-error", data.toString());
    });

    py.on("close", (code) => {
      win?.webContents.send(
        "transcriptor-complete",
        code === 0 ? "✅ Completado" : ""
      );
    });
  }
);


// Cerrar app cuando se cierren todas las ventanas (excepto macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
