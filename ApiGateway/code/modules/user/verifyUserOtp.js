module.exports = (config, params, callback) => {

    let query = 'SELECT * FROM `UserOtp` WHERE vwUserIdText = "' + params.UserId     + '" and `Otp` = "' + params.Otp + '"';

    config.mysqlDb.connection.query(query, [], function (err, rows, fields) {
        if (!err) {
            console.log('get OTP : ', rows);
            callback(undefined, rows);
        }
        else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
}