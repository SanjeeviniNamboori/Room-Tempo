module.exports = (config, params, callback) => {
    let otp = config.utils.GenerateOtp();    

    config.mysqlDb.connection.query("CALL SaveUserOtp(?, ?)", [params.vwUserIdText, otp.toString()], function (err, rows, fields) {
        if (!err) {
            //console.log('OTP is saved: ', rows);
            callback(undefined, rows);
        }
        else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
}