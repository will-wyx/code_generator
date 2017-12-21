const {BrowserWindow} = require('electron')

const template = [
    {
        submenu: [
            {
                label: '连接',
                role: 'connect',
                click() {
                    const win = new BrowserWindow({width: 200, height: 200});
                    win.show();
                }
            },
            {
                label: '退出',
                role: 'exit'
            }
        ]
    },
    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: '关于',
                role: 'about'
            }
        ]
    }
];
module.exports = template;
