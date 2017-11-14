const md5 = require('md5');

module.exports = (config, params, callback) => {   
    
    //let dbParams =  [userId, params.CurrentPassword ? md5(params.CurrentPassword) : "", md5(params.Password), userId];

    params.moduleAction = "UpdatePassword";
    config.utils.sqlConnectionCall(params, 'UpdateUserPassword',
        function (result) {
            callback(undefined, result);
        },
        function (err) {
            callback(err, undefined);
        }
    );
}