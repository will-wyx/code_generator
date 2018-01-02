const {ipcMain, BrowserWindow, dialog} = require('electron');
const fs = require('fs');
const mysql = require('mysql');
const {createModel} = require('./templates/model');
const {createDao} = require('./templates/dao');
const {createService} = require('./templates/service');
const {createAction} = require('./templates/action');


let connection = null;

// 加载配置
let connData;
let conf;
if (fs.existsSync('conf.json')) {
    conf = fs.readFileSync('conf.json', 'utf-8');
    connData = JSON.parse(conf);
} else {
    connData = {
        database: '',
        host: 'localhost',
        password: '',
        port: 3306,
        user: ''
    };
    conf = JSON.stringify(connData);
}

ipcMain.on('getConn', (e, args) => {
    if (connData.database)
        e.sender.send('getConnSuccess', connData);
});

const setConn = (e, args) => {
    if (!args) args = connData;
    const {host, port, user, password, database} = args;
    connection = mysql.createConnection({
        host, port, user, password, database,
    });
    connection.connect(err => {
        if (JSON.stringify(args) !== conf) {
            connData = args;
            fs.writeFile('conf.json', JSON.stringify(args), fserr => {
                console.log(`write log completed`)
            });
        }
        getTables(e, database);
    });
};

const getTables = (e, database) => {
    const sql = `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = '${database}'`;
    connection.query(sql, (err, r) => {
        let tables = [];
        for (let item of r) {
            tables.push(item.TABLE_NAME);
        }
        global.wins.mainWindow.webContents.send('getTablesSuccess', {database, tables});
    });
};

const getColumns = (e, table) => {
    const sql = `SELECT COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT, COLUMN_KEY FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = '${connData.database}' AND TABLE_NAME='${table}'`;
    connection.query(sql, (err, r) => {
        let result = [];
        for (let item of r) {
            let allow_update = true;
            switch (item.COLUMN_NAME) {
                case 'CREATED_DATE':
                case 'CREATED_BY':
                case 'FLAG_DEL':
                case 'FLAG_DISPLAY':
                    allow_update = false;
                    break;
                default:
                    allow_update = true;
                    break;
            }
            result.push({
                name: item.COLUMN_NAME,
                type: item.DATA_TYPE,
                comment: item.COLUMN_COMMENT,
                column_key: item.COLUMN_KEY,
                allow_update
            });
        }
        e.sender.send('getColumnsSuccess', result);
    })
};


ipcMain.on('setConn', setConn);


ipcMain.on('getNews', (event, args) => {
    connection.query('select * from exc_news', (e, r, f) => {
        event.sender.send('getNewsSuccess', r);
    });
});

ipcMain.on('getTables', getTables);
ipcMain.on('getColumns', getColumns);


ipcMain.on('createContent', (e, r) => {
    const {type} = r;
    let createContent;
    switch (type) {
        case 'model':
            createContent = createModel;
            break;
        case 'dao':
            createContent = createDao;
            break;
        case 'service':
            createContent = createService;
            break;
        case 'action':
            createContent = createAction;
            break;
        default:
            createContent = () => '没有这个类';
            break;
    }
    const content = createContent(r, connData.packagename);
    global.wins.editorWindow = new BrowserWindow({width: 900, height: 600});

    global.wins.editorWindow.loadURL(`file://${__dirname}/editor.html`);
    global.wins.editorWindow.setTitle(content.file_name);
    // loadURL(global.wins.editorWindow, 'editor');
    global.wins.editorWindow.webContents.on('did-finish-load', () => {
        global.wins.editorWindow.webContents.send('render', content);
    });
    global.wins.editorWindow.show();
});

ipcMain.on('save', (e, r) => {
    dialog.showSaveDialog({title: r.file_name, defaultPath: r.file_name}, (filename) => {
        fs.writeFile(filename, r.content, err => {
            if (err)
                console.error(err);
        });
    });
});
