module.exports = (config, params, callback) => {
    let updateQuery = "SELECT * FROM Notifications WHERE NotificationIdText = '" + params.notificationId + "'";
    config.mysqlDb.connection.query(updateQuery, [], function (err, rows, fields) {
        if (!err) {
            //console.log('updated user detail is: ', rows);
            callback(undefined, rows);
        }
        else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });

};