import o from "path";
import { fileURLToPath as w } from "url";
import { spawn as f } from "child_process";
import { app as e, ipcMain as y, BrowserWindow as j } from "electron";
const u = w(import.meta.url), n = o.dirname(u);
let i = null;
function x() {
  i = new j({
    width: 1e3,
    height: 700,
    webPreferences: {
      contextIsolation: !0,
      preload: o.join(n, "preload.mjs")
    }
  }), e.isPackaged ? i.loadFile(o.join(n, "../dist/index.html")) : i.loadURL("http://localhost:5173");
}
e.whenReady().then(x);
y.handle("run-transcriptor", async (P, a) => new Promise((d, p) => {
  const l = o.join(n, "../python/dist/transcription.exe"), h = o.join(n, "../python/venv/Scripts/python.exe"), m = e.isPackaged ? [a || "transcripcion.docx"] : [
    o.join(n, "../python/transcription.py"),
    a || "transcripcion.docx"
  ], r = f(e.isPackaged ? l : h, m, {
    cwd: o.join(n, "../python")
  });
  let s = "", c = "";
  r.stdout.on("data", (t) => {
    s += t.toString();
  }), r.stderr.on("data", (t) => {
    c += t.toString();
  }), r.on("close", (t) => {
    t === 0 ? d(s || "✅ Transcripción completada") : p(
      new Error(`❌ Error al ejecutar Python/EXE (code ${t})
${c}`)
    );
  });
}));
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
