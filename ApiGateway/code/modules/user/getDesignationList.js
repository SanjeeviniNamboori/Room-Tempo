module.exports = (config, params, callback) => {
    config.mysqlDb.connection.query("CALL `GetDesignationList`()", [], function (err, rows, fields) {
        if (err) {
            console.log('Error while getting Designation List.', err);
            callback(err, undefined);
            return;
        }

        if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0]) && rows[0][0] && rows[0][0].ErrorMessage === "" && Array.isArray(rows[1])) {

            callback(null, rows[1]);

        }
        else {
            if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0]) && rows[0][0] && rows[0][0].hasOwnProperty("ErrorMessage")) {
                callback(rows[0][0].ErrorMessage);
            }
            else {
                callback("unhandled exception occurred", undefined);
            }
        }
    });
};