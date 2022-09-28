const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
// required to pass messages between main process and renderer process
const ipc = require('electron').ipcMain
// required to load/save a level using a file dialog box
const dialog = require('electron').dialog
// required to read/write the contents of the level file
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Set if you want the application to be in debug mode or not, this will control
// how much information get's output to the console
var debugMode = false

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1280, height: 1020})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'html/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools if debugMode is enabled
  if ( debugMode ) {
    win.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// ============================================================================
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// ============================================================================

// open file dialog to load a level and send the file path to the renderer
ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function (filePath) {
    if (filePath) {
      // send `filePath` which will be the path
      event.sender.send('get-selected-level-path', filePath, debugMode)
    }
  })
})

// load the contents of the level file and send it back to the renderer
ipc.on('load-level-contents', function (event, path) {
  var filePath = `${path}`

  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.log("Error Reading Level Data :: " + error)
      event.sender.send('read-level-data', error, debugMode)
    } else {
      event.sender.send('read-level-data', data, debugMode)
    }
  });
})

ipc.on('save-file-contents', function (event, fileContentsToSave) {
  dialog.showSaveDialog({
    filters: [{ name: 'new-level', extensions: ['txt'] }]
  }, function (fileName) {
    if ( fileName === undefined ) {
      console.log( "ERROR :: file name undefined when saving" )
    }
    fs.writeFile( fileName, fileContentsToSave )
    event.sender.send('completed-save-file-contents', fileName)
  })
})