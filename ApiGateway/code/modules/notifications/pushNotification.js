var FCM = require('fcm-node');
var fcm = new FCM("AAAAlulxTmY:APA91bESODBkMFAOmRSeBfNKL5NqkGvZKFt52zQB9dDdq6kBzhHNaS5YSSdToc9pa3wu3mgTnpVT14ii4UqiOnAK5cDuJ3BCenr1So7O8-FycCt81j00dW8HpJXEE93gTTPyzMsR4w-k");

module.exports = (config, params, callback) => {

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
        to: params.deviceId,
        collapse_key: 'your_collapse_key',

        notification: {
            title: params.message,
            body: params.message
        },

        data: {  //you can send only notification or only data(or include both) 
            message: params.message,
            image: "https://lh4.ggpht.com/mJDgTDUOtIyHcrb69WM0cpaxFwCNW6f0VQ2ExA7dMKpMDrZ0A6ta64OCX3H-NMdRd20=w300"
        }
    };

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!", err);
            //config.logger.info("pushNotification.js notification not sent : " + err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
        callback(err, response);
    });
}