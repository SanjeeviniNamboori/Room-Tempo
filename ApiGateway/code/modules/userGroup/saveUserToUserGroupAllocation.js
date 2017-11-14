module.exports = (config, params, callback) => {
    "use strict";
    let sp_CallWithParamsPlaceHolder = "CALL `sp_SaveUserToUserGroupAllocation` (?,?,?,?,?,?,?)";
    let sp_Params = [
        params.userAllocatedItem.vwUserIdText,
        params.userAllocatedItem.FirstName,
        params.userAllocatedItem.LastName,
        params.userGroupInstanceId,
        params.userGroupInstanceName,
        params.userAllocatedItem.isUserAllocatedToUserGroup,
        params.systemParams.userId];

    // console.log("saveUserToUserGroupAllocation.params => ", params);

    config.mysqlDb.connection.query(sp_CallWithParamsPlaceHolder, sp_Params, function (error, response, fields) {
        if (error) {
            console.log("Error has occurred while allocating user to user group => ", error);
            callback(error, null);
        }

        if (response
            && Array.isArray(response) && response.length > 0
            && Array.isArray(response[0]) && response[0].length > 0
            && response[0][0].hasOwnProperty("IsUserGroupAllocated")) {

            callback(null, response[0][0].IsUserGroupAllocated);
        }
    });
};