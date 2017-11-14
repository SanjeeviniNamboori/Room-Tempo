const md5 = require('md5');
module.exports = (config, params, callback) => {

    //console.log("saveUsers => params", params);
    config.mysqlDb.connection.query("CALL `SaveUserDetail`(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        params.vwUserIdText, params.firstName, params.lastName,
        params.nickName, params.email, params.payrollId,
        md5(params.password), params.mobileNumber, JSON.stringify(params.deviceIds), params.systemParams.userId, params.profileImage, 
        params.reportingManagerId, params.campusId, params.designationId
    ], function (err, rows, fields) {
        if (!err) {
            console.log('The saved user is: ', rows);
            callback(undefined, rows);
        } else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
};