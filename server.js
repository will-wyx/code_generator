const {ipcMain, BrowserWindow} = require('electron');
const fs = require('fs');

const mysql = require('mysql');
const {toCamelCase} = require('./utils');
let connection = null;

// 加载配置
const conf = fs.readFileSync('conf.json', 'utf-8');
let connData = JSON.parse(conf);

ipcMain.on('getConn', (e, args) => {
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

const dataTypeToJava = (dataType) => {
    let type;
    switch (dataType) {
        case 'int':
            type = 'int';
            break;
        case 'varchar':
        case 'text':
        default:
            type = 'String';
            break;
    }
    return type;
};

const createModel = (data) => {
    let content = [];
    let parent_package = 'com.nsteam.exchange';
    let package_name = 'model';
    let table_name = data.table;
    let class_name = toCamelCase(table_name);
    content.push(`package ${parent_package}.${package_name};`);
    content.push('import java.util.Date;');
    content.push(`import ${parent_package}.util.StrUtils;`);
    content.push('');
    content.push(`@modelAttribute(name="${table_name}")`);
    content.push(`public class ${class_name} extends BaseModel {`);

    data.columns.map(e => {
        let field_name = toCamelCase(e.name);
        let type = dataTypeToJava(e.type);
        content.push(`    /**`);
        content.push(`     * ${e.comment}`);
        content.push(`     */`);
        let allow_update = e.allow_update ? '' : ', allowupdate=false';
        content.push(`    @fieldAttribute(name="${e.name}"${allow_update})`);
        content.push(`    private ${type} ${field_name};`);
        content.push(`    public void set${field_name}(${type} value) {`);
        let value = e.column_key === 'PRI' ? `StrUtils.padLeft(value, 8, '0')` : 'value';
        content.push(`        this.${field_name} = ${value};`);
        content.push(`    }`);
        content.push(`    public ${type} get${field_name}() {`);
        content.push(`        return this.${field_name};`);
        content.push(`    }`);
        content.push('');
    });

    content.push('}');
    return content.join('\n');
};

ipcMain.on('createModel', (e, r) => {
    const content = createModel(r);

    global.wins.editorWindow = new BrowserWindow({width: 900, height: 600});
    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, './build/index.html'),
    //     hash: '#/editor',
    //     protocol: 'file:',
    //     slashes: true
    // }))

    global.wins.editorWindow.loadURL('http://localhost:3000#/editor');
    global.wins.editorWindow.webContents.on('did-finish-load', () => {
        global.wins.editorWindow.webContents.send('render', content);
    });
    global.wins.editorWindow.show();
});

