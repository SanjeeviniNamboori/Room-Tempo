module.exports = (config, params, callback) => {

    config.mysqlDb.connection.query("CALL `SaveMultipleUserAttendance`(?)", [JSON.stringify(params)], 
        function (err, rows, fields) {
        if (!err) {
            //console.log('The saved user is: ', rows);
            callback(undefined, rows);
        } else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
};