import path from "path";
import { fileURLToPath } from "url";
import { app, BrowserWindow, ipcMain } from "electron";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

let pyProcess: ChildProcessWithoutNullStreams | null = null;

function getPythonCommand(
  inputPath: string,
  outputPath: string,
  modelName: string
): { command: string; args: string[]; cwdPath: string } {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));

  if (app.isPackaged) {
    const pythonResourcePath = path.join(process.resourcesPath, "python");
    return {
      command: path.join(pythonResourcePath, "dist", "transcription.exe"),
      args: [inputPath, outputPath, modelName],
      cwdPath: pythonResourcePath,
    };
  } else {
    const pythonDevPath = path.join(currentDir, "../python");
    return {
      command: path.join(pythonDevPath, "venv/Scripts/python.exe"),
      args: [
        path.join(pythonDevPath, "transcription.py"),
        inputPath,
        outputPath,
        modelName,
      ],
      cwdPath: pythonDevPath,
    };
  }
}

export function initializeTranscriptorHandlers(mainWindow: BrowserWindow) {
  ipcMain.handle(
    "run-transcriptor",
    async (
      _event,
      inputPath: string,
      outputPath: string,
      modelName: string = "base"
    ) => {
      if (pyProcess !== null) {
        mainWindow.webContents.send(
          "transcriptor-error",
          "Ya hay una transcripción en curso. Cancela la anterior o espera a que termine."
        );
        return;
      }

      const { command, args, cwdPath } = getPythonCommand(
        inputPath,
        outputPath,
        modelName
      );

      pyProcess = spawn(command, args, { cwd: cwdPath });

      pyProcess.stdout.on("data", (data) => {
        const msg = data.toString().trim();
        if (msg) {
          console.log(`[Python/Stdout]: ${msg}`);
          mainWindow.webContents.send("transcriptor-progress", msg);
        }
      });

      pyProcess.stderr.on("data", (data) => {
        const errMsg = data.toString().trim();
        if (errMsg) {
          console.error(`[Python/Stderr]: ${errMsg}`);
          mainWindow.webContents.send("transcriptor-error", errMsg);
        }
      });

      pyProcess.on("close", (code) => {
        console.log(`Proceso de transcripción cerrado con código ${code}`);
        if (pyProcess !== null) {
          mainWindow.webContents.send(
            "transcriptor-complete",
            code === 0
              ? "Transcripción completada exitosamente."
              : `Falló la transcripción. Código de salida: ${code}`
          );
        }
        pyProcess = null;
      });
    }
  );
}
