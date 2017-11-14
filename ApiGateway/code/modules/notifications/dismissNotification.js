module.exports = (config, params, callback) => {
    let updateQuery = "CALL UpdateNotificationStatus(?, ?)";
    config.mysqlDb.connection.query(updateQuery, [params.notificationId.toString(), params.statusId], function (err, rows, fields) {
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