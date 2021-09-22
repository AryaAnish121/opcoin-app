require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
    },
  });
  win.setMenu(null);
  win.loadFile('index.html');
}

app.on('ready', createWindow);

const registerDefaultProtocol = () => {
  app.removeAsDefaultProtocolClient('opcoin');
  if (process.env.NODE_ENV === 'development' && process.platform === 'win32') {
    app.setAsDefaultProtocolClient('opcoin', process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient('opcoin');
  }
};

registerDefaultProtocol();

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
