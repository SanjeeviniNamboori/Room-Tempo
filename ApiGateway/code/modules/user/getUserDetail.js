module.exports = (config, params, callback) => {
    config.mysqlDb.connection.query("CALL GetUserDetail(?)", [params.vwUserId.toString()], function (err, rows, fields) {
        if (!err) {
            //console.log('user detail is: ', rows);
            callback(undefined, rows);
        }
        else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
}