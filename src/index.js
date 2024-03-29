const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const size = 420;
  const mainWindow = new BrowserWindow({
    width: size,
    height: size,
    transparent: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('open-settings', (e, value) => {
    const webContents = e.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    console.log(value);
    win.loadFile(path.join(__dirname, 'settings.html'));
  });

  ipcMain.on('close-settings', (e, value) => {
    const webContents = e.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(path.join(__dirname, 'timer.html'));
  });

  ipcMain.on('show-window', showWindow);
  ipcMain.on('hide-window', hideWindow);


  //TODO
  //ipcMain.on('toggle-settings', (e, val) => {
  //  can I check the name of e.sender and get 'timer' or 'settings')?
  //});

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'timer.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const isMacos = () => { return process.platform === 'darwin' };

const showWindow = (e) => {
  const webContents = e.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  isMacos ? app.show() : win.show();
};

const hideWindow = (e) => {
  const webContents = e.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  isMacos ? app.hide() : win.hide();
};

