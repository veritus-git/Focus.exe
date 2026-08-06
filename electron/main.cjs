const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

// Fix for Linux global blur (XWayland fractional scaling issues)
app.commandLine.appendSwitch('ozone-platform-hint', 'auto');
app.commandLine.appendSwitch('enable-features', 'WaylandWindowDecorations');

let lastWarpTime = 0;

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

  // Event-driven cursor warp back to primary display
  ipcMain.on('warp-back-primary', () => {
    const now = Date.now();
    if (now - lastWarpTime < 50) return; // Debounce
    lastWarpTime = now;

    const bounds = primaryDisplay.bounds;
    const point = screen.getCursorScreenPoint();

    let targetX = point.x;
    let targetY = point.y;

    if (point.x < bounds.x) targetX = bounds.x + 20;
    if (point.x >= bounds.x + bounds.width) targetX = bounds.x + bounds.width - 20;
    if (point.y < bounds.y) targetY = bounds.y + 20;
    if (point.y >= bounds.y + bounds.height) targetY = bounds.y + bounds.height - 20;

    const cmd = `python3 -c "import ctypes; x11 = ctypes.cdll.LoadLibrary('libX11.so.6'); d = x11.XOpenDisplay(None); root = x11.XDefaultRootWindow(d); x11.XWarpPointer(d, 0, root, 0, 0, 0, 0, ${targetX}, ${targetY}); x11.XFlush(d)"`;
    exec(cmd);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('exit-app', () => {
  app.quit();
});
