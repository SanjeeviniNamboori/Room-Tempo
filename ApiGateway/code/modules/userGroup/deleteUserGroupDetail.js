module.exports = (config, params, callback) => {
    "use strict";
    let sp_ProcedureCallWithPlaceHolders = "CALL `sp_DeleteUserGroup` (?)";
    let sp_ProcedureParams = [params.userGroupInstanceId];

    console.log("deleteUserGroupDetail.params => ", sp_ProcedureParams);

    config.mysqlDb.connection.query(sp_ProcedureCallWithPlaceHolders, sp_ProcedureParams, function (error, response, fields) {
        if (error !== undefined && error !== null) {

            console.log("Error in calling delete user group instance detail. Error => ", error);
            callback(error, null);

        }

        if (response !== undefined && response !== null
            && Array.isArray(response) && response.length > 0
            && Array.isArray(response[0]) && response[0].length > 0) {

            let returnObj = {
                userToUserGroupAllocationCount: -1,
                userGroupToMenuAllocationCount: -1,
                userGroupRowCount: -1,
                errorCode: -1,
                message: ""
            };

            let spResponseObj = response[0][0];

            if (spResponseObj.hasOwnProperty("UserToUserGroupAllocationCount")) {
                returnObj.userToUserGroupAllocationCount = spResponseObj.UserToUserGroupAllocationCount;
            }

            if (spResponseObj.hasOwnProperty("UserGroupToMenuAllocationCount")) {
                returnObj.userGroupToMenuAllocationCount = spResponseObj.UserGroupToMenuAllocationCount;
            }

            if (spResponseObj.hasOwnProperty("UserGroupRowCount")) {
                returnObj.userGroupRowCount = spResponseObj.UserGroupRowCount;
            }

            if (spResponseObj.hasOwnProperty("ErrorCode")) {
                returnObj.errorCode = spResponseObj.ErrorCode;
            }

            if (spResponseObj.hasOwnProperty("Message")) {
                returnObj.message = spResponseObj.Message;
            }

            callback(null, returnObj);
        }
    });
};