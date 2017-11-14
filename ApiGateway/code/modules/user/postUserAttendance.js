module.exports = (config, params, callback) => {

    config.mysqlDb.connection.query("CALL `SaveUserAttendance`(?, ?, ?, ?)", [
        params.vwUserIdText, params.sessionDate, Number(params.firstHalfStatus), Number(params.secondHalfStatus)], 
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