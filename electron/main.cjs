const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

// Fix for Linux global blur (XWayland fractional scaling issues)
app.commandLine.appendSwitch('ozone-platform-hint', 'auto');
app.commandLine.appendSwitch('enable-features', 'WaylandWindowDecorations');

let cursorConfineInterval = null;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

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
          nodeIntegration: false,
        }
      });
      overlay.loadFile(path.join(__dirname, 'overlay.html')).catch(() => {
        overlay.loadURL('data:text/html,<body style="background:black;"></body>');
      });
    }
  });

  // Cursor confinement to primary display (Linux/X11 via xdotool)
  if (displays.length > 1) {
    const bounds = primaryDisplay.bounds;
    cursorConfineInterval = setInterval(() => {
      const point = screen.getCursorScreenPoint();
      let needsWarp = false;
      let newX = point.x;
      let newY = point.y;

      if (point.x < bounds.x) { newX = bounds.x; needsWarp = true; }
      if (point.x >= bounds.x + bounds.width) { newX = bounds.x + bounds.width - 1; needsWarp = true; }
      if (point.y < bounds.y) { newY = bounds.y; needsWarp = true; }
      if (point.y >= bounds.y + bounds.height) { newY = bounds.y + bounds.height - 1; needsWarp = true; }

      if (needsWarp) {
        exec(`xdotool mousemove ${newX} ${newY}`);
      }
    }, 30);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (cursorConfineInterval) clearInterval(cursorConfineInterval);
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('exit-app', () => {
  if (cursorConfineInterval) clearInterval(cursorConfineInterval);
  app.quit();
});
