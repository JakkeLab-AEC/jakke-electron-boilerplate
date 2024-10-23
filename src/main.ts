import { app, BrowserWindow } from 'electron';
import path from 'path';

if (require('electron-squirrel-startup')) app.quit();

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
    },
  });
  console.log(process.env.VITE_MODE);
  
  if (process.env.VITE_MODE === 'dev') {
    // 개발 모드에서는 Vite 서버에 연결
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // 프로덕션 모드에서는 Vite로 빌드된 파일을 로드
    mainWindow.loadFile(path.join(__dirname, '../.vite/index.html'));
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

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