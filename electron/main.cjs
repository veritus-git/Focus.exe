const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

// Fix for Linux global blur (XWayland fractional scaling issues)
app.commandLine.appendSwitch('ozone-platform-hint', 'auto');
app.commandLine.appendSwitch('enable-features', 'WaylandWindowDecorations');

let cursorLockProcess = null;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();

  const mainWindow = new BrowserWindow({
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    width: primaryDisplay.bounds.width,
    height: primaryDisplay.bounds.height,
    fullscreen: true,
    kiosk: true,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:1420');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Multi-monitor kiosk overlay logic
  const displays = screen.getAllDisplays();
  displays.forEach((display) => {
    if (display.id !== primaryDisplay.id) {
      const overlay = new BrowserWindow({
        x: display.bounds.x,
        y: display.bounds.y,
        width: display.bounds.width,
        height: display.bounds.height,
        fullscreen: true,
        frame: false,
        kiosk: true,
        alwaysOnTop: true,
        backgroundColor: '#000000',
        webPreferences: {
          preload: path.join(__dirname, 'preload.cjs'),
          nodeIntegration: false,
          contextIsolation: true,
        }
      });
      overlay.loadFile(path.join(__dirname, 'overlay.html')).catch(() => {
        overlay.loadURL('data:text/html,<body style="background:black;margin:0;padding:0;overflow:hidden;"></body>');
      });
    }
  });

  // Event-driven cursor warp back removed, using XGrabPointer native confinement
  mainWindow.once('ready-to-show', () => {
    if (displays.length > 1) {
      setTimeout(() => {
        try {
          const handle = mainWindow.getNativeWindowHandle();
          if (handle && handle.length >= 4) {
            const windowId = handle.readUInt32LE(0);
            cursorLockProcess = spawn('python3', [
              path.join(__dirname, 'native_lock.py'),
              windowId.toString()
            ]);
          }
        } catch (e) {
          console.error('[CURSOR_LOCK] Failed to spawn native_lock.py:', e);
        }
      }, 500); // Wait for X11 window map
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (cursorLockProcess) cursorLockProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('exit-app', () => {
  if (cursorLockProcess) cursorLockProcess.kill();
  app.quit();
});
