module.exports = (config, params, callback) => {
    "use strict";
    let sp_ProcedureCallWithPlaceHolders = "CALL `sp_SaveUserGroupToMenuAllocation` (?,?,?,?)";
    let sp_ParamsForProcedureCall = [
        params.userGroupInstanceId,
        params.userToMenuAllocatedItem.MenuInstanceIdText,
        params.userToMenuAllocatedItem.IsMenuAllocatedToUserGroup,
        params.systemParams.userId
    ];

    config.mysqlDb.connection.query(sp_ProcedureCallWithPlaceHolders, sp_ParamsForProcedureCall, function (error, response, fields) {
        if (error) {
            console.log("Error occured while allocating a menu to a user group. => ", error);
            callback(error, null);
        }

        if (response
            && Array.isArray(response) && response.length > 0
            && Array.isArray(response[0]) && response[0].length > 0 && response[0][0].hasOwnProperty("IsMenuAllocatedToUserGroup")) {

            callback(null, response[0][0].IsMenuAllocatedToUserGroup);
        }
    });
};