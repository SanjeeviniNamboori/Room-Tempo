module.exports = (config, params, callback) => {

    //console.log("saveProfile => params", params);
    config.mysqlDb.connection.query("CALL `SaveUserProfile`(?, ?, ?, ?)", [        
        params.systemParams.userId, params.nickName,  params.profileImage, params.systemParams.userId
    ], function (err, rows, fields) {
        if (!err) {
            //console.log('The saved user is: ', rows);
            callback(undefined, rows);
        } else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
};