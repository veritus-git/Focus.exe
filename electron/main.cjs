const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

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
