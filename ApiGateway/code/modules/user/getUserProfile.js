module.exports = (config, params, callback) => {
    params.moduleAction = "UserProfile";    
    config.utils.sqlConnectionCall(params, 'getUserDetail',
        function (result) {
            callback(undefined, result);
        },
        function (err) {
            callback(err, undefined);
        }
    );
};