import { app, BrowserWindow, ipcMain } from 'electron';
import { setIPCElectronTestHandler } from './mainArea/ipcHandler/ipcElectronTestHandler';
import path from 'path';
import { config } from 'dotenv';
import { createBrowserWindow } from './mainArea/appController/utils/windowCreater';

if (require('electron-squirrel-startup')) app.quit();

// Resolve envs
config();

app.on('ready', () => {
  createBrowserWindow({
    id: 'main-window',
    type: !app.isPackaged ? 'web' : 'local',
    isVisible: true,
    url: 'http://localhost:3000',
    localFilePath: path.join(__dirname, '../.vite/index.html'),
    preloadScriptPath: path.join(__dirname, 'preload.js')
  });

  setIPCElectronTestHandler(ipcMain);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});