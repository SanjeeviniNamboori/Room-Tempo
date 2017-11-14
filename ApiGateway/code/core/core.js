var dbwrapper = require('./db/dbWrapper');
var jwtAuthorization = require("./jwtAuthorization");
var mssql = require('mssql');
var createSqlParams = require('./db/sql/sqlParamsRequest');

module.exports = {
    mssqlDb: dbwrapper.mssqlDb,
    socketIo: null,
    utils: {
        Decrypt: function (encrypted, salt) {
            var decrypted = CryptoJS.TripleDES.decrypt(encrypted, salt);
            var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
            return plaintext;
        },
        EncryptionForCookie: function (val) {

            var crypto = require('crypto'),
                algorithm = 'aes-128-cbc',
                password = new Buffer('NextGenerationPO', "utf8"), //C12345
                iv = new Buffer('NextGenerationPO', "utf8"),
                clearEncoding = 'utf8',
                cipherEncoding = 'base64'; // hex, base64  

            var decipher = crypto.createCipheriv(algorithm, password, iv);
            var plaintext = decipher.update(val, clearEncoding, cipherEncoding);
            plaintext += decipher.final(cipherEncoding);
            return plaintext;
        },

        JwtToken: jwtAuthorization,
        GenerateOtp: function () {
            let otp;
            otp = Math.floor(Math.random() * 9999 + 1000);
            while (otp.toString().length != 4) {
                otp = Math.floor(Math.random() * 9999 + 1000);
            }
            return otp;
        },
        sendOtp: false,
        scaitsSecretKey: 'scaits',
        sqlConnectionCall: function (params, spName, successCallback, errorCallback) {
            const sqlConfig = {
                server: '192.168.1.126',
                user: 'sa',
                password: 'sa@1234',
                database: 'DeeDee'
            }
            mssql.close();
            mssql.connect(sqlConfig, err => {
                if (err) {
                    if (errorCallback)
                        errorCallback(err);
                    else
                        console.log(err);
                }

                let requestParams;
                if (params.moduleAction == "UserProfile") {
                    requestParams = createSqlParams.getUserProfileParams(params, mssql);
                }
                else if (params.moduleAction == "UpdatePassword") {
                    requestParams = createSqlParams.getUpdatePasswordParams(params, mssql);
                }
                else {
                    requestParams = createSqlParams.validateUserParams(params, mssql);
                }


                requestParams.execute(spName, (err, result) => {
                    mssql.close();
                    if (err) {
                        if (errorCallback)
                            errorCallback(err);
                        else
                            console.log(err);
                    }
                    else
                        successCallback(result);
                })

                //  new mssql.Request()
                //     .input('LoginID', mssql.NVarChar, params.UserName)
                //     .input('UserPassword', mssql.NVarChar, params.Password)
                //     .input('ClientCode', mssql.NVarChar, params.ClientCode)
                //     .execute('ValidateUser', (err, result) => {
                //         // ... error checks

                //         //console.dir(result)
                //         mssql.close();
                //         console.log(result);
                //         successCallback(result);
                //     });

            });

            mssql.on('error', err => {
                if (errorCallback)
                    errorCallback(err);
                else
                    console.log(err);
            })
        }
    },
    jwtsecretcode: "$RVW#123$",
    logger: {
        info: () => {
            //logger: winston,

        }
    },
    smsProvider: {
        url: 'http://api.smscountry.com/SMSCwebservice_bulk.aspx',
        userName: "gunnamsubhash",
        password: "78381981",
        senderId: "SMSCountry"
    }
};