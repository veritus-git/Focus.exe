const { app, BrowserWindow } = require('electron');
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('about:blank');
  setTimeout(() => {
    const handle = win.getNativeWindowHandle();
    console.log("Handle buffer length:", handle.length);
    console.log("Handle hex:", handle.toString('hex'));
    const windowId = handle.readUInt32LE(0);
    console.log("X11 Window ID:", windowId);
    app.quit();
  }, 1000);
});
