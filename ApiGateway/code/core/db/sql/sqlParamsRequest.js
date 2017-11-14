const mssql = require('mssql');

// ModuleAction - ValidateUser
let validateUserParams = function (params, sqlRequest) {
    var requestParams = new sqlRequest.Request();
    requestParams.input('LoginID', mssql.NVarChar, params.UserName);
    requestParams.input('UserPassword', mssql.NVarChar, params.Password);
    requestParams.input('ClientCode', mssql.NVarChar, params.ClientCode);

    return requestParams;
}

// ModuleAction - UserProfile
let getUserProfileParams = function (params, sqlRequest) {
    var requestParams = new sqlRequest.Request();
    requestParams.input('userID', mssql.Int, params.systemParams.userId);

    return requestParams;
}

// ModuleAction - UpdatePassword
let getUpdatePasswordParams = function (params, sqlRequest) {
    var requestParams = new sqlRequest.Request();
    requestParams.input('UserId', mssql.Int, params.systemParams.userId);
    requestParams.input('OldPassword', mssql.NVarChar, params.CurrentPassword);
    requestParams.input('NewPassword', mssql.NVarChar, params.Password);

    return requestParams;
}

module.exports = {
    validateUserParams: validateUserParams,
    getUserProfileParams: getUserProfileParams,
    getUpdatePasswordParams: getUpdatePasswordParams,
};
