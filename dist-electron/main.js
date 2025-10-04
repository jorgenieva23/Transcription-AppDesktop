import o from "path";
import { fileURLToPath as y } from "url";
import { spawn as g } from "child_process";
import { app as e, ipcMain as p, dialog as x, BrowserWindow as j } from "electron";
const P = y(import.meta.url), t = o.dirname(P);
let a = null;
function E() {
  a = new j({
    width: 1e3,
    height: 700,
    webPreferences: {
      contextIsolation: !0,
      preload: o.join(t, "preload.mjs")
    }
  }), e.isPackaged ? a.loadFile(o.join(t, "../dist/index.html")) : a.loadURL("http://localhost:5173");
}
e.whenReady().then(E);
p.handle("show-save-dialog", async () => {
  const { canceled: s, filePath: r } = await x.showSaveDialog({
    title: "Guardar transcripción",
    defaultPath: "transcripcion.docx",
    // 👈 cambia esto
    filters: [{ name: "Word Document", extensions: ["docx"] }]
  });
  return s ? null : r;
});
p.handle(
  "run-transcriptor",
  async (s, r, c) => new Promise((h, m) => {
    const w = o.join(t, "../python/dist/transcription.exe"), f = o.join(
      t,
      "../python/venv/Scripts/python.exe"
    ), u = e.isPackaged ? [r, c] : [
      o.join(t, "../python/transcription.py"),
      r,
      c
    ], i = g(e.isPackaged ? w : f, u, {
      cwd: o.join(t, "../python")
    });
    let l = "", d = "";
    i.stdout.on("data", (n) => {
      l += n.toString();
    }), i.stderr.on("data", (n) => {
      d += n.toString();
    }), i.on("close", (n) => {
      n === 0 ? h(l || "✅ Transcripción completada") : m(
        new Error(
          `❌ Error al ejecutar Python/EXE (code ${n})
${d}`
        )
      );
    });
  })
);
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
