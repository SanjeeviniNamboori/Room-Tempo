module.exports = (config, params, callback) => {
    "use strict";
    // console.log("saveUserGroupDetail => params", params);
    /*
    *   IN namespaceInstanceId          VARCHAR(36),
        IN namespaceInstanceName        VARCHAR(100),
        IN userGroupInstanceId          VARCHAR(36),
        IN userGroupInstanceName        VARCHAR(100),
        IN userGroupInstanceDescription VARCHAR(500),
        IN userGroupInstanceIconClass   VARCHAR(30),
        IN isUserGroupAdmin             BOOLEAN,
        IN loggedInUserIdText           VARCHAR(36)
    * */

    let sp_NameWithParamsPlaceHolders = "CALL `sp_SaveUserGroupInstanceDetail` (?,?,?,?,?,?,?,?)";
    let sp_Params = [
        params.namespaceInstanceId,
        params.namespaceInstanceName,
        params.userGroupInstanceId,
        params.name,
        params.description,
        params.iconClass,
        params.isAdminGroup,
        params.systemParams.userId
    ];

    console.log(sp_Params);

    config.mysqlDb.connection.query(sp_NameWithParamsPlaceHolders, sp_Params, function (error, response, fields) {
        if (error) {
            console.error("Error has occured while saving userGroupInstanceDetail => ", error);
            console.log("Calling callback in if (error)");
            callback(error, null);
        }

        if (response) {
            console.log("Calling callback in if (response)");
            if (response && Array.isArray(response) && response.length > 0 && Array.isArray(response[0]) && response[0].length > 0
                && response[0][0].hasOwnProperty("newUserGroupInstanceId")) {

                callback(null, response[0][0].newUserGroupInstanceId);
            }
        }
    });
};