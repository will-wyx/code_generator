const {BrowserWindow} = require('electron')

// const template = [
//     {
//         submenu: [
//             {
//                 label: '连接',
//                 role: 'connect',
//                 click() {
//                     const win = new BrowserWindow({width: 400, height: 300});
//                     // win.loadURL(url.format({
//                     //     pathname: path.join(__dirname, './build/index.html'),
//                     //     hash: '#/connection',
//                     //     protocol: 'file:',
//                     //     slashes: true
//                     // }))
//
//                     win.loadURL('http://localhost:3000#/connection');
//                     win.show();
//                 }
//             },
//             {
//                 label: '退出',
//                 role: 'exit'
//             }
//         ]
//     },
//     {
//         label: '帮助',
//         role: 'help',
//         submenu: [
//             {
//                 label: '关于',
//                 role: 'about'
//             }
//         ]
//     }
// ];

let template = [
    {
        submenu: [
            {
                label: '连接',
                role: 'connect',
                click() {
                    const win = new BrowserWindow({width: 460, height: 350});
                    // win.loadURL(url.format({
                    //     pathname: path.join(__dirname, './build/index.html'),
                    //     hash: '#/connection',
                    //     protocol: 'file:',
                    //     slashes: true
                    // }))

                    win.loadURL('http://localhost:3000#/connection');
                    win.show();
                }
            },
            {
                label: '退出',
                role: 'exit'
            }
        ]
    }, {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    // on reload, start fresh and close any old
                    // open secondary windows
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach(function (win) {
                            if (win.id > 1) {
                                win.close()
                            }
                        })
                    }
                    focusedWindow.reload()
                }
            }
        }, {
            label: 'Toggle Full Screen',
            accelerator: (function () {
                if (process.platform === 'darwin') {
                    return 'Ctrl+Command+F'
                } else {
                    return 'F11'
                }
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                }
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: (function () {
                if (process.platform === 'darwin') {
                    return 'Alt+Command+I'
                } else {
                    return 'Ctrl+Shift+I'
                }
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        }, {
            type: 'separator'
        }, {
            label: 'App Menu Demo',
            click: function (item, focusedWindow) {
            }
        }]
    }, {
        label: 'Window',
        role: 'window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }, {
            type: 'separator'
        }, {
            label: 'Reopen Window',
            accelerator: 'CmdOrCtrl+Shift+T',
            enabled: false,
            key: 'reopenMenuItem',
            click: function () {
            }
        }]
    }, {
        label: 'Help',
        role: 'help',
        submenu: [{
            label: 'About',
            role: 'about'
        }]
    }];

module.exports = template;
