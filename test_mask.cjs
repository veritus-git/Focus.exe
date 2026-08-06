const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600, show: false });
  win.loadURL('data:text/html,<button onclick="console.log(\'CLICKED\')">CLICK ME</button>');
  win.once('ready-to-show', () => {
    win.show();
    setTimeout(() => {
      const handle = win.getNativeWindowHandle();
      const windowId = handle.readUInt32LE(0);
      const pyCode = `
import sys, ctypes, time
wid = int(sys.argv[1])
x11 = ctypes.cdll.LoadLibrary('libX11.so.6')
d = x11.XOpenDisplay(None)
res = x11.XGrabPointer(d, wid, True, 0xFFFF, 1, 1, wid, 0, 0)
x11.XFlush(d)
time.sleep(10)
`;
      const p = spawn('python3', ['-c', pyCode, windowId.toString()]);
      p.on('exit', () => app.quit());
    }, 500);
  });
});
