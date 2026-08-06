const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  exitApp: () => ipcRenderer.send('exit-app'),
  warpBack: () => ipcRenderer.send('warp-back-primary'),
});
