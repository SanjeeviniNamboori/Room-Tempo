module.exports = (config, serverParams, callback) => {
    
    config.mysqlDb.connection.query("call GetUserNotificationList(?, ?)", [serverParams.systemParams.userId, serverParams.systemParams.SourceId], 
    function (err, rows, fields) {
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