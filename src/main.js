const { app, BrowserWindow, Menu } = require('electron');
const { type } = require('node:os');
const path = require('node:path');

app.setName('Bug Buddy');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// ----------------------
// | Theme Menu Options |
// ----------------------
const createMenu = () => {
  const layout = [
    {
      label: 'Bug Buddy',
      submenu: [ {
          label: 'About Bug Buddy',
          click: () => {

          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Themes',
      submenu: [
        {
          label: 'Default',
          type: 'radio',
          checked: true,
          click: () => {
            mainWindow.webContents.send('theme-change', 'default')
          }
        },
        {
          label: 'Halloween',
          type: 'radio',
          click: () => {
            mainWindow.webContents.send('theme-change', 'halloween')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(layout);
  Menu.setApplicationMenu(menu)
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 425,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // load custom menu options
  createMenu()

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
