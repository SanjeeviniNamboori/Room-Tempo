module.exports = (config, params, callback) => {

    let sp_ProcedureCallWithPlaceHolders = 'CALL SearchReferredByEmployees(?, ?, ?, ?, ?)';
    let sp_Params = [
        params.PayRollId,
        params.FirstName,
        params.LastName,
        params.StartingRowNumber,
        params.RecordsPerPage
    ];

    // console.log("searchReferredBy => ", sp_Params);

    config.mysqlDb.connection.query(sp_ProcedureCallWithPlaceHolders, sp_Params, function (err, rows, fields) {
        // console.log("searchReferredBy => ", rows[1]);
        if (!err) {
            // console.log('user list is: ', rows);
            callback(undefined, rows);
        }
        else {
            console.log('Error while performing Query.', err);
            callback(err, undefined);
        }
    });
};