const {app, BrowserWindow, Menu} = require('electron');

const path = require('path');
const url = require('url');

const template = require('./menu');

global.wins = {
    mainWindow: {},
    connectionWindow: {},
    editorWindow:  {}
};

function createWindow() {
    // Create the Menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // Create the browser window.
    global.wins.mainWindow = new BrowserWindow({width: 900, height: 600});

    // and load the index.html of the app.
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, './build/index.html'),
    //     hash: '#/connection',
    //     protocol: 'file:',
    //     slashes: true
    // }))
    global.wins.mainWindow.loadURL('http://localhost:3000');

    global.wins.mainWindow.on('closed', function () {
        global.wins.mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (global.wins.mainWindow === null) {
        createWindow()
    }
});

require('./server');
