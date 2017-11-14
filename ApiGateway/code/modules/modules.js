const createUser = require('./user/saveUser');
const getUserList = require('./user/getUserList');
const getUserProfile = require('./user/getUserProfile');
const saveUserProfile = require('./user/saveUserProfile');
const getUserDetail = require('./user/getUserDetail');
const updatePassword = require('./user/updateUserPassword');
const searchUsers = require('./user/searchUsers');
const userLogout = require('./user/userLogout');
const searchReferredBy =  require("./user/searchReferredBy");

const saveUserGroupDetail = require("./userGroup/saveUserGroupDetail");
const getUserGroupList = require("./userGroup/getUserGroupInstanceList");
const getUserGroupDetail = require("./userGroup/getUserGroupDetail");
const saveUserToUserGroupAllocation = require("./userGroup/saveUserToUserGroupAllocation");
const saveUserGroupToMenuAllocation = require("./userGroup/saveUserGroupToMenuAllocation");
const deleteUserGroupDetail = require("./userGroup/deleteUserGroupDetail");

const getNotificationList = require("./notifications/getNotificationsListByUser");
const dismissNotification = require("./notifications/dismissNotification");
const getNotificationDetail = require("./notifications/getNotificationDetail");

module.exports = [
    { key: "CreateUser", callback: createUser, pushkey: null, isLoggingEnabled: false },
    { key: "GetUserList", callback: getUserList, pushkey: null },
    { key: "GetUserProfile", callback: getUserProfile, pushkey: null },
    { key: "SaveUserProfile", callback: saveUserProfile, pushkey: null, isLoggingEnabled: false },
    { key: "GetUserDetail", callback: getUserDetail, pushkey: null },
    { key: "UpdatePassword", callback: updatePassword, pushkey: null },
    { key: "SearchUsers", callback: searchUsers, pushkey: null },
    { key: "UserLogout", callback: userLogout, pushkey: null, isLoggingEnabled: false },
    { key: "SearchReferredBy", callback: searchReferredBy, pushkey: null},


    { key: "SaveUserGroupDetail", callback: saveUserGroupDetail, pushkey: null, isLoggingEnabled: false },
    { key: "GetUserGroupList", callback: getUserGroupList, pushkey: null },
    { key: "GetUserGroupDetail", callback: getUserGroupDetail, pushkey: null },
    { key: "SaveUserToUserGroupAllocation", callback: saveUserToUserGroupAllocation, pushkey: null, isLoggingEnabled: false },
    { key: "SaveUserGroupToMenuAllocation", callback: saveUserGroupToMenuAllocation, pushkey: null, isLoggingEnabled: false },
    { key: "DeleteUserGroupDetail", callback: deleteUserGroupDetail, pushkey: null, isLoggingEnabled: false }, 

    { key: "GetNotificationList", callback: getNotificationList, pushkey: null },
    { key: "DismissNotification", callback: dismissNotification, pushkey: null, isLoggingEnabled: false },
    { key: "GetNotificationDetail", callback: getNotificationDetail, pushkey: null },
];
