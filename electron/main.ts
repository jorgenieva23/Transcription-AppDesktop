import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win: BrowserWindow | null = null;

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

app.whenReady().then(createWindow);

ipcMain.handle("show-save-dialog", async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Guardar transcripción",
    defaultPath: "transcripcion.docx", // 👈 cambia esto
    filters: [{ name: "Word Document", extensions: ["docx"] }],
  });
  return canceled ? null : filePath;
});

ipcMain.handle(
  "run-transcriptor",
  async (_event, inputPath: string, outputPath: string) => {
    const currentWindow = BrowserWindow.getFocusedWindow() || win;

    if (!currentWindow) {
      console.error("No se pudo obtener la ventana para enviar mensajes.");
      return;
    }

    let command: string;
    let programArgs: string[];
    let cwdPath: string;

    if (app.isPackaged) {
      command = path.join(
        process.resourcesPath,
        "python",
        "dist",
        "transcription.exe"
      );
      programArgs = [inputPath, outputPath];
      cwdPath = path.join(process.resourcesPath, "python");
    } else {
      command = path.join(__dirname, "../python/venv/Scripts/python.exe");
      programArgs = [
        path.join(__dirname, "../python/transcription.py"),
        inputPath,
        outputPath,
      ];
      cwdPath = path.join(__dirname, "../python");
    }
    console.log("Empaquetado:", app.isPackaged);
    console.log("Ruta comando:", command);
    console.log("Existe:", fs.existsSync(command));
    console.log("Working dir:", cwdPath);

    const py = spawn(command, programArgs, { cwd: cwdPath });

    py.stdout.on("data", (data) => {
      const msg = data.toString().trim();
      if (msg) {
        console.log(`[Python/Stdout]: ${msg}`);
        currentWindow.webContents.send("transcriptor-progress", msg);
      }
    });

    py.stderr.on("data", (data) => {
      const errMsg = data.toString().trim();
      if (errMsg) {
        console.error(`[Python/Stderr]: ${errMsg}`);
        currentWindow.webContents.send("transcriptor-error", errMsg);
      }
    });

    py.on("close", (code) => {
      console.log(`Proceso de transcripción cerrado con código ${code}`);
      currentWindow.webContents.send(
        "transcriptor-complete",
        code === 0
          ? "✅ Transcripción completada exitosamente."
          : `❌ Falló la transcripción. Código de salida: ${code}`
      );
    });
  }
);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
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
