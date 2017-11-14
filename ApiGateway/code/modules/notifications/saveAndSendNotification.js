let pushNotification = require('./pushNotification.js');

module.exports = (config, params, callback) => {

    let sendAppNotificatoin = (notificationObj) => {
        pushNotification(config, notificationObj, function (err, response) {
            try {
                if (err) {
                    var errObject;
                    if (typeof err == 'object') {
                        console.log(err);
                        errObject = err;
                    }
                    else {
                        errObject = {
                            failure: true,
                            results: []
                        }
                    }
                    if (errObject.failure) {
                        notificationObj.status = 0;
                        notificationObj.statusMessage = errObject.results.length > 0 ? errObject.results[0]["error"] : "";
                    }
                    else {
                        notificationObj.status = 1;
                        notificationObj.statusMessage = errObject.results.length > 0 ? errObject.results[0]["error"] : "";
                    }
                }
            } catch (error) {
                console.log("exception in push notification:", error);
                notificationObj.status = 0;
                notificationObj.statusMessage = error.message;
            }

            updateNotification(notificationObj);

        });
    };


    let sendSmsToMobile = (notificationObj) => {

        var options = {
            url: config.smsProvider.url,
            method: 'GET',
            headers: {},
            qs: { "User": config.smsProvider.userName, "Passwd": config.smsProvider.password, "Sid": config.smsProvider.senderId, "Mobilenumber": notificationObj.deviceId, "Message": notificationObj.message }
        }

        // Start the request
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body                    
                //console.log(body)
                notificationObj.successMessage = "Success";
                notificationObj.ErrorMessage = "";
            }
            else {
                config.logger.log("error", body);
                notificationObj.successMessage = "";
                notificationObj.ErrorMessage = "Failure";
            }

            //config.producer.send(config.topics.EntityManagement, { event: "SaveNotification", params: notificationObj });
        });

    }

    //Removable code when the notification object will be saved to Neo4J

    let updateNotification = (notificationObj) => {
        config.mysqlDb.connection.query("call SaveDeviceNotification(?, ?, ?, ?, ?, ?, ?, ?)", [notificationObj.deviceNotificationId, notificationObj.notificationId, notificationObj.deviceId, notificationObj.message, notificationObj.title, notificationObj.status, notificationObj.statusMessage, params.userId],
            function (err, rows, fields) {
                if (!err) {
                    callback(undefined, {});
                }
                else {
                    callback({}, undefined);
                }
            });
    }

    let saveDeviceNotification = (paramsObj, send) => {
        //console.log("before save: ", paramsObj);
        config.mysqlDb.connection.query("call SaveDeviceNotification(?, ?, ?, ?, ?, ?, ?, ?)", [null, paramsObj.notificationId, paramsObj.deviceId, paramsObj.message, paramsObj.title, paramsObj.status, paramsObj.statusMessage, params.userId],
            function (err, rows, fields) {
                if (!err) {

                    //console.log(paramsObj);
                    paramsObj.deviceNotificationId = rows[0][0]["DeviceNotificationId"];
                    if (params.send == true || params.send == undefined)
                        sendAppNotificatoin(paramsObj);
                    else
                        callback(undefined, rows);
                }
                else {
                    callback({}, undefined);
                }
            });
    }

    // Send Notification
    let notificationParams = params;

    //Retrieve template data with instance values
    config.mysqlDb.connection.query("call GetUserNotificationTemplateDetail(?, ?)", [params.NotificationTemplateId, params.userId],
        function (err, rows, fields) {
            if (!err) {
                //console.log('user list is: ', rows);

                if (rows.length == 0) {
                    callback("error in retrieving notification template details", undefined);
                }

                let notificationTemplateObj = rows[0][0];
                let userDetailObj = rows[1][0];

                config.mysqlDb.connection.query("call SaveNotification(?, ?, ?, ?, ?)", [null,
                    params.message ? params.message : notificationTemplateObj.EmailTemplateText,
                    params.messageTitle ? params.messageTitle : notificationTemplateObj.EmailTitle,
                    "1", params.userId],
                    function (err, rows, fields) {
                        if (!err) {
                            //Push notification to Client application
                            if (params.userId) {
                                //config.emitData(rows[1][0], params.userId, config, "NotificationReceived");
                            }

                            let notificationId = rows[0][0]["NotificationId"];

                            if (userDetailObj.DeviceIds && userDetailObj.DeviceIds != "") {

                                let deviceIds = JSON.parse(userDetailObj.DeviceIds);

                                for (var deviceType in deviceIds.apps) {


                                    deviceIds.apps[deviceType].forEach(function (deviceId) {

                                        let saveParams = {
                                            deviceId: deviceId,
                                            message: params.message ? params.message : notificationTemplateObj.MobileTemplate,
                                            status: 0,
                                            title: params.messageTitle ? params.messageTitle : notificationTemplateObj.MobileTitle,
                                            statusMessage: "",
                                            userId: params.userId,
                                            send: true,
                                            notificationId: notificationId,
                                            deviceNotificationId: null
                                        };

                                        //Send Notification to user
                                        switch (deviceType) {
                                            case 'Android':
                                                //saveParams.message = notificationTemplateObj.MobileTemplate;
                                                //saveParams.send = true;
                                                saveDeviceNotification(saveParams);
                                                break;
                                            case 'IOS':
                                                //saveParams.message = notificationTemplateObj.MobileTemplateText;
                                                //sendSmsToMobile(saveParams);
                                                break;
                                            case 'SMS':
                                                //saveParams.message = notificationTemplateObj.SmsTemplateText;
                                                break;
                                            case 'Web':
                                                //saveParams.message = notificationTemplateObj.EmailTemplateText;
                                                saveParams.send = false;
                                                saveDeviceNotification(saveParams);
                                                break;
                                            case 'Email':
                                                saveParams.message = notificationTemplateObj.EmailTemplateText;
                                                break;
                                        }
                                    });

                                }
                            }
                        }
                        else {
                            callback({}, undefined);
                        }
                    });
            }
            else {
                console.log('Error while performing Query.', err);
                callback(err, undefined);
            }
        }
    );
    /*
        getTemplateText(config, { type: 'notificationTemplate', cbkey: notificationParams.templateId, instanceId: notificationParams.entityInstanceId }, function (err, response) {
            if (!err && response) {
                let notificationTemplateBody = response;
    
                let arrNotificationId = [];
    
                notificationParams.userDevices.forEach(function (deviceObj) {
                    if (notificationParams.notifyOptions[deviceObj.type] && deviceObj.send) {
    
                        //Save notification object 
                        config.docDb.bucket.counter("notification", 1, { initial: 1 }, function (err, res) {
                            if (err) {
                                console.log('increment failed', err);
                                return reject(err);
                            }
    
                            arrNotificationId.push(res.value.toString());
    
                            let saveParams = {
                                cbkey: res.value.toString(),
                                deviceId: deviceObj.deviceId,
                                message: null,
                                sentOn: new Date(),
                                status: "prepared",
                                type: "notification",
                                title: notificationTemplateBody.title
                            };
    
                            //Send Notification to user
                            switch (deviceObj.type) {
                                case 'Android':
                                    saveParams.message = notificationTemplateBody.mobileTemplateText;
                                    senAppdNotificatoin(saveParams);
                                    break;
                                case 'IOS':
                                    saveParams.message = notificationTemplateBody.mobileTemplateText;
                                    sendSmsToMobile(saveParams);
                                    break;
                                case 'SMS':
                                    saveParams.message = notificationTemplateBody.smsTemplateText;
                                    break;
                                case 'Web':
                                    saveParams.message = notificationTemplateBody.emailTemplateText;
                                    break;
                                case 'Email':
                                    saveParams.message = notificationTemplateBody.emailTemplateText;
                                    break;
                            }
    
                            config.producer.send(config.topics.EntityManagement, { event: "SaveNotification", params: saveParams });
                            callback(err, saveParams);
                        });
    
                    }
                });
    
                updateNotificationIdDoc(arrNotificationId);
            }
        });
    
    */

};




























/*let pushNotification = require('./pushNotification.js');

module.exports = (config, params, callback) => {

    let senAppdNotificatoin = (notificationObj) => {
        pushNotification(config, notificationObj, function (err, response) {
            if (err) {
                var errObject = JSON.parse(err);
                if (errObject.failure) {
                    notificationObj.status = "failure";
                    config.logger.info("saveAndSendNotification.js Notification send failure :  " + errObject.results.length > 0 ? errObject.results[0]["error"] : "");
                    notificationObj.statusMessage = errObject.results.length > 0 ? errObject.results[0]["error"] : "";
                }
                else {
                    notificationObj.status = "success";
                    config.logger.info("saveAndSendNotification.js Notification send success :  " + errObject.results.length > 0 ? errObject.results[0]["error"] : "");
                    notificationObj.statusMessage = errObject.results.length > 0 ? errObject.results[0]["error"] : "";
                }
            }

            //config.producer.send(config.topics.SystemManagement, { event: "UpdateNotificationStatus", params: notificationObj });
            callback(err, response);

        });
    };


    let routeTheDevices = (appsObj) => {

        var messageParams = {
            message: params.message,
            deviceId: "",
            notificationId: params.cbkey
        };

        for (var appType in appsObj) {
            var arrDevices = [];
            for (var deviceId in appsObj[appType]) {
                messageParams.appType = appType;

                if (appType == "Android") {
                    messageParams.deviceId = deviceId;
                    senAppdNotificatoin(messageParams);
                }
                else if (appType == "Email") {

                }
                else if (appType == "IOS") {

                }
                else if (appType == "SMS") {

                }
                else if (appType == "Web") {

                }
            }
        }
    };


    // let profileQuery = config.db.N1qlQuery.fromString('SELECT * FROM ' + config.db.bucketString + ' WHERE type =$1 and clientId = $2');

    // config.db.bucket.query(profileQuery, ['clientProfile', config.clientId], (err, profileResponse, meta) => {
    //     if (err) {
    //         console.log('operation failed', err);
    //         config.logger.info("saveAndSendNotification.js getting clientProfile :  " + err);
    //         callback(err);
    //         return;
    //     }

    //     var clientNotificationTypes = profileResponse[0] ? profileResponse[0]["default"]["notificationTypes"] : undefined;
    //     if (clientNotificationTypes) {
    let query = config.db.N1qlQuery.fromString('SELECT apps FROM ' + config.db.bucketString + ' WHERE type =$1 and cbkey in $2');

    config.db.bucket.query(query, ["entityInstance", params.userIds], (err, rows, meta) => {
        if (err) {
            console.log('operation failed', err);
            //config.logger.info("saveAndSendNotification.js get user profile failure :  " + err);
            callback(err);
            return;
        }


        if (rows.length > 0) {
            for (var index = 0; index < rows.length; index++) {
                let userAppObj = rows[index]['apps'];
                for (var appType in userAppObj) {
                    console.log(userAppObj[appType]);

                    // let getAppTypeObj = function (appObj) {
                    //     return appObj.type == appType;
                    // }

                    // let cilentAppObj = clientNotificationTypes.filter(getAppTypeObj);

                    // if (cilentAppObj[0] && cilentAppObj[0].isEnabled) { //preapare the apps object to send the notifications and which are enable at client level

                    for (var keyIndex = 0; keyIndex < userAppObj[appType].length; keyIndex++) {
                        var deviceObj = {
                            //deviceType: appType,
                            deviceId: userAppObj[appType][keyIndex],
                            status: 'prepared'
                        };

                        params.apps[appType][userAppObj[appType][keyIndex]] = deviceObj;
                    }
                    // }
                }
            }

            if (!params.cbkey || (params.cbkey && params.cbkey == 0)) {
                config.db.bucket.counter(params.type, 1, { initial: 1 }, function (err, res) {
                    if (err) {
                        console.log('increment failed', err);
                        //config.logger.info("saveAndSendNotification.js increment failed :  " + err);
                        return reject(err);
                    }

                    params.cbkey = res.value.toString();
                    config.producer.send(config.topics.EntityManagement, { event: "SaveNotification", params: params });
                    routeTheDevices(params.apps);
                });
            }
            else {
                config.producer.send(config.topics.EntityManagement, { event: "SaveNotification", params: params });
                routeTheDevices(params.apps);
            }

        }

    });
    //     }
    // });


}*/