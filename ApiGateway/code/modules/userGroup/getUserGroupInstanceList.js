module.exports = (config, params, callback) => {
    "use strict";
    let sp_CallParams = "CALL sp_getUserGroupList()";
    let sp_Params = [];

    config.mysqlDb.connection.query(sp_CallParams, sp_Params, function (error, response, fields) {
        if (error) {
            console.log("Error => ", error);
            callback(error, null);
        }
        // console.log("Response from getUserGroupInstanceList => ", response);
        if (response && Array.isArray(response)) {
            callback(null, response[0]);
        }
    });
};