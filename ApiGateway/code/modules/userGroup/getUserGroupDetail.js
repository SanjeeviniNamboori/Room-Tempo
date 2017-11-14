module.exports = (config, params, callback) => {
    "use strict";
    let sp_CallWithParamsPlaceHolders = "CALL `sp_GetUserGroupDetail` (?)";
    let sp_Params = [params.userGroupInstanceId];

    config.mysqlDb.connection.query(sp_CallWithParamsPlaceHolders, sp_Params, function (error, response, fields) {
        if (error) {
            callback(error, null);
        }

        let returnObj = {
            userGroupInstanceDetail: {},
            userToUserGroupAllocation: {},
            userGroupToMenuAllocation: []
        };

        if (response) {

            if (response && Array.isArray(response) && response.length > 2) {
                if (Array.isArray(response[0]) && response[0].length > 0) {
                    returnObj.userGroupInstanceDetail = response[0][0];
                }

                // console.log(response[1]);

                let returnUserToUserGroupAllocationObj = {};

                if (Array.isArray(response[1])) {
                    response[1].forEach(function (userToUserGroupAllocatedObj) {
                        // console.log(userToUserGroupAllocatedObj);
                        if (returnUserToUserGroupAllocationObj.hasOwnProperty(userToUserGroupAllocatedObj.vwUserIdText)) {

                            if (userToUserGroupAllocatedObj.IsUserAllocatedToUserGroup === 1) {

                                if (returnUserToUserGroupAllocationObj[userToUserGroupAllocatedObj.vwUserIdText].userGroupInstanceName.trim() === "") {
                                    returnUserToUserGroupAllocationObj[userToUserGroupAllocatedObj.vwUserIdText].userGroupInstanceName += userToUserGroupAllocatedObj.UserGroupInstanceName;
                                } else {

                                    returnUserToUserGroupAllocationObj[userToUserGroupAllocatedObj.vwUserIdText].userGroupInstanceName += "," + userToUserGroupAllocatedObj.UserGroupInstanceName;
                                }
                            }
                        } else {
                            returnUserToUserGroupAllocationObj[userToUserGroupAllocatedObj.vwUserIdText] = {
                                vwUserIdText: userToUserGroupAllocatedObj.vwUserIdText,
                                payrollId: userToUserGroupAllocatedObj.PayrollId,
                                firstName: userToUserGroupAllocatedObj.FirstName,
                                lastName: userToUserGroupAllocatedObj.LastName,
                                emailId: userToUserGroupAllocatedObj.EmailId,
                                mobileNumber: userToUserGroupAllocatedObj.MobileNumber,
                                userGroupInstanceName: "",
                                isUserAllocatedToUserGroup: false
                            };
                            if (userToUserGroupAllocatedObj.IsUserAllocatedToUserGroup === 1) {
                                returnUserToUserGroupAllocationObj[userToUserGroupAllocatedObj.vwUserIdText].userGroupInstanceName = userToUserGroupAllocatedObj.UserGroupInstanceName;
                            }
                        }

                        if (userToUserGroupAllocatedObj.UserGroupInstanceIdText === params.userGroupInstanceId
                            && userToUserGroupAllocatedObj.IsUserAllocatedToUserGroup === 1) {

                            returnUserToUserGroupAllocationObj[userToUserGroupAllocatedObj.vwUserIdText].isUserAllocatedToUserGroup = true;
                        }

                    });

                    returnObj.userToUserGroupAllocation = returnUserToUserGroupAllocationObj;
                }

                if (Array.isArray(response[2])) {
                    response[2].forEach(function (userGroupToMenuAllocationObj) {
                        // console.log("userGroupToMenuAllocationObj => ", userGroupToMenuAllocationObj);
                        returnObj.userGroupToMenuAllocation.push(userGroupToMenuAllocationObj);
                    });
                }
            }
            callback(null, returnObj);
        }
    });
};