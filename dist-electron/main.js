import o from "path";
import { fileURLToPath as f } from "url";
import { spawn as u } from "child_process";
import { app as t, ipcMain as g, dialog as y, BrowserWindow as w } from "electron";
import P from "fs";
const x = f(import.meta.url), s = o.dirname(x);
let l = null;
function j() {
  l = new w({
    width: 1e3,
    height: 700,
    webPreferences: {
      contextIsolation: !0,
      preload: o.join(s, "preload.mjs")
    }
  }), t.isPackaged ? l.loadFile(o.join(s, "../dist/index.html")) : l.loadURL("http://localhost:5173");
}
t.whenReady().then(j);
g.handle("show-save-dialog", async () => {
  const { canceled: m, filePath: i } = await y.showSaveDialog({
    title: "Guardar transcripción",
    defaultPath: "transcripcion.docx",
    // 👈 cambia esto
    filters: [{ name: "Word Document", extensions: ["docx"] }]
  });
  return m ? null : i;
});
g.handle(
  "run-transcriptor",
  async (m, i, h) => {
    const a = w.getFocusedWindow() || l;
    if (!a) {
      console.error("No se pudo obtener la ventana para enviar mensajes.");
      return;
    }
    let r, d, c;
    t.isPackaged ? (r = o.join(
      process.resourcesPath,
      "python",
      "dist",
      "transcription.exe"
    ), d = [i, h], c = o.join(process.resourcesPath, "python")) : (r = o.join(s, "../python/venv/Scripts/python.exe"), d = [
      o.join(s, "../python/transcription.py"),
      i,
      h
    ], c = o.join(s, "../python")), console.log("Empaquetado:", t.isPackaged), console.log("Ruta comando:", r), console.log("Existe:", P.existsSync(r)), console.log("Working dir:", c);
    const p = u(r, d, { cwd: c });
    p.stdout.on("data", (e) => {
      const n = e.toString().trim();
      n && (console.log(`[Python/Stdout]: ${n}`), a.webContents.send("transcriptor-progress", n));
    }), p.stderr.on("data", (e) => {
      const n = e.toString().trim();
      n && (console.error(`[Python/Stderr]: ${n}`), a.webContents.send("transcriptor-error", n));
    }), p.on("close", (e) => {
      console.log(`Proceso de transcripción cerrado con código ${e}`), a.webContents.send(
        "transcriptor-complete",
        e === 0 ? "✅ Transcripción completada exitosamente." : `❌ Falló la transcripción. Código de salida: ${e}`
      );
    });
  }
);
t.on("window-all-closed", () => {
  process.platform !== "darwin" && t.quit();
});
