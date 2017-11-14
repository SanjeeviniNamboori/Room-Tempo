module.exports = (config, params, callback) => {
    let query = 'SELECT deviceIds FROM Users WHERE vwUserIdText = "' + params.systemParams.userId + '"';
    config.mysqlDb.connection.query(query, [], function (err, rows, fields) {
        if (!err) {
            //console.log('user detail is: ', rows);           
            if (rows.length > 0) {
                let userDevices = rows[0]["deviceIds"];

                if (userDevices == null) {
                    userDevices = {
                        apps: {
                            Android: [],
                            IOS: [],
                            Web: [],
                            Email: [],
                            SMS: []
                        }
                    };
                }
                else {
                    userDevices = JSON.parse(rows[0]["deviceIds"]);
                }

                if (userDevices) {
                    if (userDevices["apps"][params.systemParams.Source].indexOf(params.systemParams.SourceId) !== -1) {

                        userDevices["apps"][params.systemParams.Source].splice(userDevices["apps"][params.systemParams.Source].indexOf(params.systemParams.SourceId), 1);

                        let updateQuery = "UPDATE Users SET deviceIds = '" + JSON.stringify(userDevices) + "' WHERE vwUserIdText = '" + params.systemParams.userId + "'";
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
                    } else {
                        callback(undefined, undefined);
                    }
                }
            }
            else{
                callback(undefined, undefined);
            }

        }
        else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
}