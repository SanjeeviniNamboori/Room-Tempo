var jwt = require('jsonwebtoken');

module.exports = {

    GetToken: function (config, params, callback) {
        try {
            var token = jwt.sign(params, config.jwtsecretcode, {
                expiresIn: 24 * 10 * 60 //24 * 60 * 60 // expires in 24 hours, number is seconds
            });

            var tokenData = {
                token: token
            };
            if (callback)
                callback(tokenData);
            else
                return tokenData;
        } catch (ex) {
            callback(undefined);
        }
    },
    VerifyToken: function (config, params, callback) {

        var dataToSend = {

        };
        // verifies secret and checks exp
        try {
            var decoded = jwt.verify(params.token, config.jwtsecretcode);
            dataToSend.decoded = decoded;

        } catch (ex) {
            //token expired
            if (ex.message = "jwt expired") {
                if (callback) {
                    callback(undefined);
                    return;
                }
                else
                    return undefined;
            }
        }
        if (callback)
            callback(dataToSend);
        else
            return dataToSend;
    },

    UpdateToken: function (config, params, callback) {
        try {
            var decoded = jwt.verify(params.token, config.jwtsecretcode);

            params.userId = decoded.header.userId;

            var token = jwt.sign({ "expiresIn": 60, "header": { userId: params.userId, namespaceId: params.namespaceId } }, config.jwtsecretcode, {
                expiresIn: 24 * 60 * 60 //24 * 60 // expires in 24 hours, number is seconds
            });

            var tokenData = {
                token: token
            };

            if (callback)
                callback(tokenData);
            else
                return tokenData;
        }
        catch (ex) {
            if (callback)
                callback(undefined);
            else
                return undefined;
        }
    },
    DecryptToken: function(token, key, callback){
         try {
            var decoded = jwt.verify(token, key);

            var tokenData = {
                token: decoded
            };

            if (callback)
                callback(tokenData);
            else
                return tokenData;
        }
        catch (ex) {
            if (callback)
                callback(undefined);
            else
                return undefined;
        }

    },
    EncryptToken: function(callback){
        try {
            var token = jwt.sign({ admNo:178379941, campusId:91}, "scaits");

            var tokenData = {
                token: token
            };
            if (callback)
                callback(tokenData);
            else
                return tokenData;
        } catch (ex) {
            callback(undefined);
        }
    }

}