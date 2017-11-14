module.exports = (config, params, callback) => {
    config.mysqlDb.connection.query("call getuserlist()", [
    ], function (err, rows, fields) {
        if (!err) {
            // console.log('user list is: ', rows);
            callback(undefined, rows);
        }
        else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
}