// const oracledb = require('oracledb');
// oracledb.getConnection(
//     {
//         user: 'gpsmanage',
//         password: 'gpsmanage123456',
//         connectString: '220.194.201.12:1521/gpsmanage'
//     },
//     (err, connection) => {
//         connection.execute(
//             'SELECT * FROM SYS_DIC', [], {}, (e, r) => {
//                 console.log(r);
//                 connection.close();
//             }
//         )
//     }
// );
const sql = require('mssql');
const config = {
    user: 'sa',
    password: '123456',
    server: '192.168.1.20', // You can use 'localhost\\instance' to connect to named instance
    database: 'xtgsm',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
sql.connect(config, err => {
    // ... error checks

    // Query

    new sql.Request().query('select 1 as number', (err, result) => {
        // ... error checks

        console.dir(result)
    })

    // Stored Procedure

    new sql.Request()
        .input('input_parameter', sql.Int, value)
        .output('output_parameter', sql.VarChar(50))
        .execute('procedure_name', (err, result) => {
            // ... error checks

            console.dir(result)
        })
})

sql.on('error', err => {
    // ... error handler
})
