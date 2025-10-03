# 📦 Transcriptor de Videos con Electron + Python (Whisper)

Este proyecto es una aplicación de escritorio multiplataforma que permite transcribir videos a texto en formato `.docx` usando **OpenAI Whisper** como motor de reconocimiento de voz.  
La interfaz está construida en **Electron + React (Vite)** y el backend de transcripción en **Python**.

---

##  Características

- 🎬 **Carga automática** de videos desde `python/videos/`.
- 🎧 **Extracción de audio** con FFmpeg.
- 🧠 **Transcripción** usando Whisper (PyTorch).
- 📑 **Exporta resultados** a archivo `.docx`.
- 📦 **Distribución final** como instalador:
  - `.exe` (Windows)
  - `.AppImage` (Linux)
  - `.dmg` (Mac)

---

## 📁 Estructura del proyecto
```
📦electron-vite-project
 ┣ 📂dist-electron       # Código compilado de Electron (NO subir)
 ┣ 📂electron            # Código fuente de Electron (main.ts, preload.ts)
 ┣ 📂public              # Archivos estáticos
 ┣ 📂python              # Script + modelo de transcripción
 ┃ ┣ 📂audios            # Archivos generados en runtime (NO subir)
 ┃ ┣ 📂bin               # Binarios como ffmpeg.exe (SUBIR)
 ┃ ┣ 📂build             # Carpeta temporal de PyInstaller (NO subir)
 ┃ ┣ 📂dist              # Ejecutables generados por PyInstaller (NO subir)
 ┃ ┣ 📂videos            # Archivos de prueba (NO subir)
 ┃ ┣ 📜requirements.txt  # Dependencias Python (SUBIR)
 ┃ ┣ 📜transcription.py  # Script Python (SUBIR)
 ┃ ┗ 📜transcription.spec# Archivo generado por PyInstaller (NO subir)
 ┣ 📂src                 # Frontend React
 ┣ 📜.gitignore
 ┣ 📜electron-builder.json5
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┗ 📜README.md
 ```

 ## 📥 Instalación para desarrolladores
1. Clonar el repositorio
```
git clone https://github.com/tuusuario/transcriptor.git
cd transcriptor
```

2. Instalar dependencias de Node/Electron
```
npm install
```
3. Instalar dependencias de Python

- Es recomendable usar un entorno virtual:
```
cd python
python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate # Linux/Mac
pip install -r requirements.txt
```

4. Instalar FFmpeg

- La aplicación necesita ffmpeg.exe para extraer audio de los videos.
Descargalo desde el sitio oficial:

🔗 [Descargar FFmpeg (ffmpeg-2025-09-28-git-0fdb5829e3-full_build.7z)](https://www.gyan.dev/ffmpeg/builds/)

 - Copiá ffmpeg.exe dentro de la carpeta:
```
python/bin/
```
▶️ Uso en desarrollo
1. Colocar videos

 - Copia tus archivos .mp4, .avi, .mov o .mkv en la carpeta:
```
python/videos/
```
2. Ejecutar la app

 - En la raíz del proyecto:
```
npm run dev
```
3. Transcribir

En la aplicación de escritorio, hacé clic en "Transcribir video".
El resultado se guarda en:
```
python/transcripcion.docx
```
## 📦 Empaquetar Python en EXE (Windows)

- Para generar un ejecutable standalone del script de Python:
```
cd python
pyinstaller --onefile --name transcription transcription.py
```

 - Esto generará:
```
python/dist/transcription.exe
```
## 🖥️ Generar instalador de la aplicación

```
npm run build && npx electron-builder
```
<h4>El instalador se genera en:</h4>

```
release/{version}/
```

- Windows → transcriptor-Windows-Setup.exe

- Linux → transcriptor-Linux-x86_64.AppImage

- Mac → transcriptor-Mac.dmg

<hr/>

<h4>📂 Carpetas importantes</h4>

- python/videos/ → aquí van los videos a transcribir.

- python/audios/ → se generan audios .wav temporales.

- python/transcription.py → script de transcripción.

- python/bin/ffmpeg.exe → binario FFmpeg.

- python/requirements.txt → dependencias de Python.
<hr/>

<h4>📝 Dependencias principales</h4>

- Node/Electron:

  - electron

  - electron-builder

  - vite + react

- Python:

  - whisper

  - torch

  - python-docx