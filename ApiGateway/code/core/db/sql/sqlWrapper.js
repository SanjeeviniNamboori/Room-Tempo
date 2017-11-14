const mssql = require('mssql');

let connection = mssql.connect({
    //host: '45.127.57.125',
    server: '192.168.1.126',
    //port: '6603',
    user: 'sa',
    password: 'sa@1234',
    database: 'DeeDee'
});

module.exports = {
    connection: connection
};
