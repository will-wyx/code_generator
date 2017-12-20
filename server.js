const {ipcMain} = require('electron');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '220.194.201.12',
    port: 3307,
    user: 'exchange',
    password: 'exchange123456',
    database: 'exchange'

});

connection.connect();
ipcMain.on('getNews', (event, args)=> {
    // console.log(r);
    connection.query('select * from exc_news', (e, r, f) => {
        event.sender.send('getNewsSuccess', r);
    });
});

