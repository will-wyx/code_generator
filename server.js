const {ipcMain} = require('electron');
const fs = require('fs');

const mysql = require('mysql');
let connection = null;
ipcMain.on('setConn', (e, args) => {
    const {host, port, user, password, database} = args;
    connection = mysql.createConnection({
        host, port, user, password, database,
    });
    connection.connect(err => {
        fs.writeFile('conf.json', JSON.stringify(args), fserr => {
            console.log(`write log completed`)
        });
    });
});


ipcMain.on('getNews', (event, args) => {
    // console.log(r);
    connection.query('select * from exc_news', (e, r, f) => {
        event.sender.send('getNewsSuccess', r);
    });
});

