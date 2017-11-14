const express = require('express');
const httpModule = require('http');
const socketio = require('socket.io');
var bodyParser = require('body-parser');
var request = require('request');
var moment = require('moment');

let app = express();
let http = httpModule.createServer(app);
let io = socketio(http);

let config = require('./code/core/core');
config.socketIo = io;

app.use(bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' }));
app.use(bodyParser.urlencoded(bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' })));

// app.use(bodyParser.json({ limit: '50mb' })); // for parsing application/json
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // for parsing application/x-www-form-urlencoded

//modules
const modules = require('./code/modules/modules.js');

io.sockets.on('connection', (socket) => {
    console.log('user connected');

    //  console.log('New socket from: ' + socket.request.connection.remoteAddress);    
    //  console.log('New socket port: ' + JSON.stringify(socket.request.connection._peername));
    //  console.log('New socket port: ' + JSON.stringify(socket.handshake));

    socket.on('disconnect', () => {
        console.log(config.userId + ': user disconnected on ');
        //config.removeUserFromUsersKeyStore(socket.id);
        // console.log('disconnected IP: ' + socket.request.connection.remoteAddress);    
        //loop through object store and remove this socket.id
    });

    modules.forEach((module) => {

        socket.on(module.key, (params, responseCallback) => {
            // delete params.token;
            // delete params.Source;
            // delete params.SourceId;

            console.log("apiGateway => Module.key", module.key);

            let ContinueNextStep = function () {
                if (params.systemParams && params.systemParams.token) {
                    config.utils.JwtToken.VerifyToken(config, { "token": params.systemParams.token }, function (decodedObj) {
                        if (decodedObj && decodedObj.decoded.header && decodedObj.decoded.header.userId) {

                            params.systemParams.userId = decodedObj.decoded.header.userId;
                            params.systemParams.emailId = decodedObj.decoded.header.emailId;

                            console.log("UserInstanceId: " + params.systemParams.userId);
                            console.log("userEmailId: " + params.systemParams.emailId);

                            //if (module.key === "GetNotificationList")
                            //config.pushToUserKeyStore({ userId: decodedObj.decoded.header.userId.toString() }, socket.id.toString());

                            //console.log('Info in APIGateway', { "key": module.key, "params": params });

                            module.callback(config, params, (err, response) => {

                                if (module.isLoggingEnabled === true) {

                                    let loggingParams = {
                                        vwUserIdText: '',
                                        moduleKey: module.key,
                                        stackTrace: '',
                                        calledFrom: '',
                                        requestParams: {},
                                        responseParams: {},
                                        logTypeId: -1,
                                        logMessage: ''
                                    };

                                    loggingParams.vwUserIdText = params.systemParams.userId;
                                    loggingParams.calledFrom = params.systemParams.Source;
                                    loggingParams.requestParams = JSON.stringify(params);
                                    loggingParams.responseParams = JSON.stringify(response);
                                    if (err) {
                                        loggingParams.logTypeId = 2;
                                        loggingParams.logMessage = JSON.stringify(err);
                                        if (err.stack) {
                                            loggingParams.stackTrace = JSON.stringify(err.stack);
                                        }
                                    } else {
                                        loggingParams.logTypeId = 1;
                                        loggingParams.logMessage = "Success";
                                    }

                                    let saveLoggingInformationCallback = function (error, response) {
                                        // console.log("Error => ", error);
                                        // console.log("Response => ", response);
                                    };

                                    //saveLoggingInformation(config, loggingParams, saveLoggingInformationCallback);
                                }

                                if (err) {
                                    if (typeof responseCallback === "function")
                                        responseCallback(err, response);

                                    return;
                                }

                                if (typeof responseCallback === "function")
                                    responseCallback(err, response);
                                else {
                                    return response;
                                }
                            });

                        }
                        else {
                            if (typeof responseCallback === "function")
                                responseCallback({ message: "Session Expired" });
                            else
                                return { message: "Session Expired" };
                            //socket.emit(module.key, { message: "Session Expired" });
                        }
                    });
                }
                else {
                    //config.removeUserFromUsersKeyStore(socket.id);

                    if (typeof responseCallback === "function")
                        responseCallback({ message: "Session Expired" });
                    else
                        return { message: "Session Expired" };
                }
            };

            if (params.updateToken) {

                if (params.systemParams.token) {
                    config.utils.JwtToken.UpdateToken(config, {
                        "expiresIn": 60,
                        token: params.systemParams.token,
                        namespaceId: params.namespaceId
                    }, function (tokenObj) {
                        if (tokenObj) {
                            params.systemParams.token = tokenObj.token;
                            responseCallback(undefined, params);
                            //ContinueNextStep();
                        }
                        else {
                            //config.removeUserFromUsersKeyStore(socket.id);
                            if (typeof responseCallback === "function")
                                responseCallback({ message: "Session Expired" });
                            else
                                return { message: "Session Expired" };
                        }
                    });
                }
                else {
                    //config.removeUserFromUsersKeyStore(socket.id);
                    if (typeof responseCallback === "function")
                        responseCallback({ message: "Session Expired" });
                    else
                        return { message: "Session Expired" };
                }
            }
            else {
                ContinueNextStep();
            }

        });
    });

});


console.log("port: " + process.env.PORT);


// ==================== files uploading =================================

const fileUpload = require('express-fileupload');

app.use(fileUpload());

const fs = require('fs');
const Jimp = require("jimp");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/upload', function (req, res) {

    let multiResponse = [];

    let saveImag = (imagObj, callback) => {
        Jimp.read(imagObj, function (err, image) {
            let imgHeight = image.bitmap.height;
            let imgWidth = image.bitmap.width;

            image
                .getBase64(image.getMIME(), function (img, baseImageResponse, data) {
                    req.body.baseImage = baseImageResponse;

                    let resizeHeight, resizeWidth, resizeCardHeight, reseizeCardWidth, resizeThumbHeight, resizeThumbWidth;

                    if (req.body.displayOptionId === 3) {
                        if (req.body.dimensionId === 1) {
                            resizeHeight = 150;
                            resizeWidth = 300;
                            resizeCardHeight = 150;
                            reseizeCardWidth = 300;
                            resizeThumbHeight = 150;
                            resizeThumbWidth = 300;
                        }
                        else {
                            resizeHeight = 200;
                            resizeWidth = 400;
                            resizeCardHeight = 200;
                            reseizeCardWidth = 400;
                            resizeThumbHeight = 200;
                            resizeThumbWidth = 400;
                        }
                    }
                    else if (req.body.displayOptionId === 1 || req.body.displayOptionId === 2) {
                        if (req.body.dimensionId === 1) {
                            resizeHeight = 100;
                            resizeWidth = 100;
                            resizeCardHeight = 100;
                            reseizeCardWidth = 100;
                            resizeThumbHeight = 100;
                            resizeThumbWidth = 100;
                        }
                        else {
                            resizeHeight = 200;
                            resizeWidth = 200;
                            resizeCardHeight = 200;
                            reseizeCardWidth = 200;
                            resizeThumbHeight = 200;
                            resizeThumbWidth = 200;
                        }
                    }
                    else {
                        resizeHeight = 300;
                        resizeWidth = 300;
                        resizeCardHeight = 200;
                        reseizeCardWidth = 200;
                        resizeThumbHeight = 150;
                        resizeThumbWidth = 150;
                    }

                    image.resize(resizeHeight, resizeWidth)            // resize 
                        .quality(80)                 // set JPEG quality                                 
                        //.write("lena-small-bw." + image.getExtension())
                        .getBase64(image.getMIME(), function (img, base64Image, data) {

                            image.resize(300, Jimp.AUTO)            // resize 
                                .quality(80)                 // set JPEG quality                                                             
                                .getBase64(image.getMIME(), function (img, base64CircleImage, data) {
                                    image.resize(resizeHeight, resizeWidth)            // resize 
                                        .quality(80)                 // set JPEG quality                                    
                                        .getBase64(image.getMIME(), function (img, base64ThumbImage, data) {
                                            callback({ detialImage: base64Image, circleImage: base64CircleImage, thumbImage: base64ThumbImage });
                                        });
                                });
                        });
                })
            // .getBuffer(image.getMIME(), function (img, baseImageResponse, data) {
            //     console.log(img);
            //     console.log(baseImageResponse);
            // });
        });
    };

    if (req.files && Array.isArray(req.files.photos)) {
        for (let index = 0; index < req.files.photos.length; index++) {
            saveImag(req.files.photos[index].data, function (imgResponse) {

                let imgRequest = Object.assign({}, req.body);
                imgRequest.rectImage = imgResponse.detialImage;
                imgRequest.circleSquareImage = imgResponse.circleImage;
                imgRequest.thumbImage = imgResponse.thumbImage;
                imgRequest.imageGuid = "";


                instanceImageSave(config, imgRequest, function (err, response) {
                    //console.log(err, response);
                    multiResponse.push(response);
                    if (multiResponse.length === req.files.photos.length)
                        res.send(multiResponse);
                });

            });
        }
    }
    else {
        let imgData = "";
        if (!req.files && req.body.Source === "Mobile") {
            imgData = new Buffer(req.body.image, 'base64');
        }
        else {
            imgData = req.files.photos.data;
        }
        saveImag(imgData, function (imgResponse) {

            let imgRequest = Object.assign({}, req.body);
            imgRequest.rectImage = imgResponse.detialImage;
            imgRequest.circleSquareImage = imgResponse.circleImage;
            imgRequest.thumbImage = imgResponse.thumbImage;

            instanceImageSave(config, imgRequest, function (err, response) {
                res.send([response]);
                //res.send(req.files);
            });
        });

    }


});

app.post('/downloadImage', function (req, res) {
    getInstanceImage(config, req.body, function (err, response) {
        res.send([response]);
    });
});


app.post('/imageUpload', function (req, res) {
    console.log("image from mobile");
    //console.log(req);
    let imageObj = req.body.image;

    let response = {};

    response.type = "image/" + req.body.type;
    response.data = new Buffer(req.body.image, 'base64');


    Jimp.read(response.data, function (err, image) {
        image.resize(200, 200)            // resize 
            .quality(80)                 // set JPEG quality                                 
            .write("android-small-bw." + image.getExtension())
            .getBase64(image.getMIME(), function (img, base64Image, data) {
                res.send(base64Image);
            });
    });

});

let embedVideo = require("embed-video");
let getVideoId = require('get-video-id');
app.post('/getVimeoImage', function (req, res) {
    if (req.body && req.body.videoUrl && req.body.videoUrl !== "")
        embedVideo.image('https://vimeo.com/' + getVideoId(req.body.videoUrl).id, { image: 'thumbnail_medium' }, function (err, thumbnail) {
            if (err) throw err;
            console.log(thumbnail.src);
            thumbnail.videoId = getVideoId(req.body.videoUrl).id;
            // http://i.vimeocdn.com/video/122513613_200x150.jpg
            res.send(thumbnail);
        });
    else
        res.send({ "requestInReturn": req.body });
});


const validateUser = require('./code/modules/user/validateUser.js');
const updateUserPassword = require('./code/modules/user/updateUserPassword.js');
const generateOtpForUser = require('./code/modules/user/generateOtpForUser.js');
const verifyUserOtp = require('./code/modules/user/verifyUserOtp.js');
const addAppIdToUser = require('./code/modules/user/addAppIdToUser.js');

// const SendOtp = require('sendotp');
// const sendOtp = new SendOtp('172311ASex2uKW59a67f84', 'OTP for your SCAITS login is {{otp}}, please do not share it with anybody');


app.post("/api", function (req, res) {

    let apiRequestParams = req.body.requestParams;
    let apiSystemParams = req.body.systemParams;

    if (apiRequestParams.APIReg === "10000") { //Register new client with user
        if (!apiRequestParams.hasOwnProperty("entityObj")) {
            apiRequestParams.entityObj = {};
        }
        registerNewClient(config, apiRequestParams, function (error, responseObj) {
            res.end(JSON.stringify(responseObj));
        });
    }
    else if (apiRequestParams.APIReg === "10001" || apiRequestParams.APIReg === 10001) { // Get Client Profile by client Code
        clientProfile(config, apiRequestParams, function (error, responseObj) {

            apiRequestParams.successMessage = "Profile details retrieved";
            apiRequestParams.ErrorMessage = "";
            res.end(JSON.stringify(responseObj));
        });
    }
    else if (apiRequestParams.APIReg === "10003" || apiRequestParams.APIReg === 10003) { // Validate User credentials - from Login Page

        validateUser(config, apiRequestParams, function (error, responseObj) {

            if (error) {
                res.end(JSON.stringify(error));
                return;
            }

            let headerObj = {};
            if (responseObj.recordsets.length === 0 || (responseObj.recordsets.length > 0 && responseObj.recordsets[0].length === 0)) {
                res.end(JSON.stringify(responseObj));
                return;
            }
            if (responseObj.recordsets.length > 0 && responseObj.recordsets[0].length > 0) {

                headerObj = {
                    userId: responseObj.recordsets[0][0]["userID"],
                    emailId: responseObj.recordsets[0][0]["email"]
                };

                config.utils.JwtToken.GetToken(config, { "expiresIn": 60, "header": headerObj }, function (tokenObj) {
                    if (tokenObj) {
                        responseObj.recordsets[0][0]["token"] = tokenObj.token;
                        res.end(JSON.stringify(responseObj.recordsets[0]));
                    }
                    else {
                        res.end(JSON.stringify({ "error": 1, "ErrorMessage": "Invalid Paremeters" }));
                    }
                });
            }
            else {
                console.log("Else condition");
                res.end(JSON.stringify(responseObj));
            }
        });
    }
    else if (apiRequestParams.APIReg === "10005" || apiRequestParams.APIReg === 10005) { //Forgot password - send OTP to registerd mobile number based on provided User Name
        validateUser(config, apiRequestParams, function (error, responseObj) {

            if (error) {
                res.end(JSON.stringify(error));
                return;
            }

            if (responseObj && responseObj.length === 0) {
                apiRequestParams.ErrorMessage = "Please provide valid user name";
                res.end(JSON.stringify(apiRequestParams));
            }

            if (responseObj && responseObj.length > 0) {

                generateOtpForUser(config, { vwUserIdText: responseObj[0]["vwUserIdText"] }, function (err, userOtpObj) {
                    if (config.utils.sendOtp) {
                        sendOtp.send(userOtpObj[0][0]["MobileNumber"], "OTPSMS", userOtpObj[0][0]["Otp"], function (err, response) {
                            console.log(err, response);
                            let clientResponseObj = {
                                userId: responseObj[0]["vwUserIdText"],
                                ErrorMessage: response.type === "success" ? "" : "OTP not sent",
                                successMessage: response.type === "success" ? "OTP sent to registered mobile number" : ""
                            };

                            res.end(JSON.stringify(clientResponseObj));
                        });
                    }
                    else {

                        let clientResponseObj = {
                            userId: responseObj[0]["vwUserIdText"],
                            mobileNumber: responseObj[0]["MobileNumber"],
                            ErrorMessage: "",
                            successMessage: "OTP sent to registered mobile number"
                        };

                        res.end(JSON.stringify(clientResponseObj));
                    }
                });

            }
            else {
                apiRequestParams.ErrorMessage = "Please provide valid user name";
                res.end(JSON.stringify(apiRequestParams));
            }
        });


    }
    else if (apiRequestParams.APIReg === "10006" || apiRequestParams.APIReg === 10006) { //Validate OTP which is entered by user        

        verifyUserOtp(config, apiRequestParams, function (error, response) {
            if (response.length > 0) {
                apiRequestParams.successMessage = "OTP verified successfully, please change password";
                apiRequestParams.ErrorMessage = "";
            }
            else {
                apiRequestParams.successMessage = "";
                apiRequestParams.ErrorMessage = "Invalid OTP, please try again";
            }
            res.end(JSON.stringify(apiRequestParams));
        });


    }
    else if (apiRequestParams.APIReg === "10007" || apiRequestParams.APIReg === 10007) { // Change user password
        updateUserPassword(config, apiRequestParams, function (error, responseObj) {

            apiRequestParams.successMessage = "Password changed successfully";
            apiRequestParams.ErrorMessage = "";
            res.end(JSON.stringify(apiRequestParams));
        });
    }
    else
        res.end("Request received");
});

/* Route for writing data to an excel and downloading it */

app.post('/getExcelData', function(req,res){
    // data which needs to be sent in the response.
  var  responseObj =   {
        reservationList: [
          {
            GuestName: "Washington George",
            StartDate: "Oct 22",
            Adults: "2",
            Children: "1",
            EndDate: "Oct 27",
            Nights: "5",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "123.00",
            Status: "Confirmed"
          },
          {
            GuestName: "Clinton B.",
            StartDate: "Oct 24",
            Adults: "1",
            Children: "2",
            EndDate: "Oct 25",
            Nights: "3",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "249.00",
            Status: "Reserved"
          },
          {
            GuestName: "Jefferson Thomas",
            StartDate: "Oct 27",
            Adults: "3",
            Children: "1",
            EndDate: "Oct 29",
            Nights: "2",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "850.00",
            Status: "Cancelled"
          },
          {
            GuestName: "Trump Donald",
            StartDate: "Oct 26",
            Adults: "2",
            Children: "3",
            EndDate: "Oct 27",
            Nights: "6",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "5823.00",
            Status: "Departed"
          },
          {
            GuestName: "John Trump",
            StartDate: "Oct 25",
            Adults: "1",
            Children: "1",
            EndDate: "Oct 27",
            Nights: "7",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "124.00",
            Status: "In House"
          },
          {
            GuestName: "Jackson Michel",
            StartDate: "Oct 21",
            Adults: "3",
            Children: "2",
            EndDate: "Oct 21",
            Nights: "1",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "145.00",
            Status: "Confirmed"
          },
          {
            GuestName: "Michel David",
            StartDate: "Oct 23",
            Adults: "2",
            Children: "1",
            EndDate: "Oct 23",
            Nights: "5",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "745.00",
            Status: "Reserved"
          },
          {
            GuestName: "Washington George",
            StartDate: "Oct 22",
            Adults: "3",
            Children: "3",
            EndDate: "Oct 27",
            Nights: "4",
            Unit: "143N-503",
            UnitType: "3 BR",
            Amount: "621.00",
            Status: "Departed"
          }
        ],
        headerColumnList: {
          GuestName: {
            Label: "Guest Name",
            IsChecked: true,
            ColumnName: "GuestName"
          },
          StartDate: { Label: "Stay", IsChecked: true, ColumnName: "StartDate" },
          // EndDate: { Label: "", IsChecked: true, ColumnName: "EndDate" },
          Unit: { Label: "Unit", IsChecked: true, ColumnName: "Unit" },
          Status: { Label: "Status", IsChecked: false, ColumnName: "Status" },
          Amount: { Label: "Amount", IsChecked: true, ColumnName: "Amount" }
        },
        listType: "list",
        RowsPerPage: 10,
        totalCount: 0
      };

      // sending response back to the route.

      res.send(responseObj);
});
/* Route for writing data to an excel and downloading it */

// ==================== files uploading =================================

http.listen(process.env.PORT || 1339);