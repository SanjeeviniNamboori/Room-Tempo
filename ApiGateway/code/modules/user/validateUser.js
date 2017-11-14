const md5 = require('md5');
//const saveLoggingInformation = require("../logging/saveLoggingInformation");
const mssql = require('mssql');

module.exports = (config, params, callback) => {

    Promise.all([
        //config.db.helpers.upsertDocBYtypeANDkey(config, params.entity),
        // config.db.helpers.getDocBYtypeANDkey(config, {
        //    cbkey: params.parentId,
        //    type: params.parentType
        // })
    ])
        .then(data => {

            if (params.APIReg) {
                params.type = "user";

                let query = "";

                if (params.APIReg === 10003 || params.APIReg === "10003") {
                    query = 'SELECT * FROM `Users` WHERE PayrollId = "' + params.UserName + '" and `UserPassword` = "' + md5(params.Password) + '"';
                }
                else if (params.APIReg === 10005 || params.APIReg === "10005") {
                    query = 'SELECT * FROM `Users` WHERE PayrollId = "' + params.UserName + '"';
                }

                console.log("validateUser => query", query);

                const sqlConfig = {
                    server: '192.168.1.126',
                    user: 'sa',
                    password: 'sa@1234',
                    database: 'DeeDee'
                }
                 mssql.close();



                // mssql.connect(config, err => {
                //     // Stored Procedure

                // var requestParams = new mssql.Request(sqlConfig);
                // requestParams.input('LoginID', mssql.NVarChar, params.UserName);
                // requestParams.input('UserPassword', mssql.NVarChar, params.Password);
                // requestParams.input('ClientCode', mssql.NVarChar, params.ClientCode);

                //     new mssql.Request()
                //         .input('LoginID', mssql.NVarChar, params.UserName)
                //         .input('UserPassword', mssql.NVarChar, params.Password)
                //         .input('ClientCode', mssql.NVarChar, params.ClientCode)
                //         .execute('ValidateUser', (err, result) => {
                //             // ... error checks

                //             //console.dir(result)
                //             mssql.close();
                //             console.log(result);
                //             callback(undefined, result);
                //         })
                // })



                config.utils.sqlConnectionCall(params, 'ValidateUser',
                    function (result) {
                        callback(undefined, result);
                    },
                    function (err) {
                        callback(err, undefined);
                    }
                );


            }
            else {

            }
        })
        .catch(reason => callback(reason));
}