const oracledb = require('oracledb');
oracledb.getConnection(
    {
        user: 'gpsmanage',
        password: 'gpsmanage123456',
        connectString: '220.194.201.12:1521/gpsmanage'
    },
    (err, connection) => {
        connection.execute(
            'SELECT * FROM SYS_DIC', [], {}, (e, r) => {
                console.log(r);
                connection.close();
            }
        )
    }
);
