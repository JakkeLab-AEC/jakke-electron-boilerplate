import { app, BrowserWindow, ipcMain } from 'electron';
import { setIPCElectronTestHandler } from './mainArea/ipcHandler/ipcElectronTestHandler';
import path from 'path';
import os from 'os';

if (require('electron-squirrel-startup')) app.quit();

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  console.log(path.join(__dirname, 'preload.js'));
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Jakke-Electron-Three',
    titleBarStyle: os.platform() == 'win32'? 'hidden' : 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
      devTools: !app.isPackaged,
    },
  });
  
  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../.vite/index.html'));
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();

  setIPCElectronTestHandler(ipcMain);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});