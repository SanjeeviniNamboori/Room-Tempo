const express = require('express');
const httpModule = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');
let app = express();
app.use(cors());
let http = httpModule.createServer(app);
const request = require('request-promise');
var Excel = require('exceljs');
var fs = require('fs');
var path = require('path');
app.use(bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' }));
app.use(bodyParser.urlencoded(bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' })));
var config = require('./config');

/* This is a backend route to write data to excel and download it */

app.post('/exportToExcel', function (req, res) {


    //  Excel sheet properties. You may access properties which are sent from web client.
    var fileNameExcel = req.body.filename;
    var workbook = new Excel.Workbook();
    workbook.created = new Date();
    var worksheet = workbook.addWorksheet(fileNameExcel + "list");
    var fileName = fileNameExcel + '.xlsx';



    // Request properties to make a call to a route in ApiGateway
    const options = {
        method: 'POST',
        uri: config.apiGatewayURL,
        body: { // data: params
        },
        json: true
    }

    // Making a call to ApiGateway URL.
    request(options).then(function (response) {

        if (req.body.modulename == 'reservations') {

            var valid = true;
            var columnHeaders = [];
            var reservationList = response.reservationList;
            var headerValues = response.headerColumnList;
            // Fetching all the header values that needs to be written into an excel sheet and pushing it to an array.
            Object.keys(headerValues).forEach(function (keyheader) {
                if (headerValues[keyheader].IsChecked == true) {
                    columnHeaders.push({ header: headerValues[keyheader].Label, key: headerValues[keyheader].ColumnName, width: 32 });
                } else {
                    return;
                }
            });

            // Fetching all the row values that needs to be written into an excel sheet and pushing into an object.    
            if (columnHeaders.length != 0) {
                for (var i = 0; i < reservationList.length; i++) {
                    var excelObject = {};
                    var currentObj = reservationList[i];
                    for (var k = 0; k < columnHeaders.length; k++) {
                        if (currentObj.hasOwnProperty(columnHeaders[k].key)) {
                            var filteredData = null;
                            // code to format any column values 
                            if (columnHeaders[k].key == 'GuestName') {
                                filteredData = currentObj[columnHeaders[k].key] + " " + currentObj.Adults + " Adults, " + currentObj.Children + " Children ";
                                excelObject[columnHeaders[k].key] = filteredData;
                                // console.log("column name" + columnHeaders[k].header + "value " + filteredData)
                            } else if (columnHeaders[k].key == 'StartDate') {
                                filteredData = currentObj[columnHeaders[k].key] + " - " + currentObj.EndDate + "(" + currentObj.Nights + " Nights) ";
                                excelObject[columnHeaders[k].key] = filteredData;
                                // console.log("column name" + columnHeaders[k].header + "value " + filteredData)
                            }
                            else if (columnHeaders[k].key == 'Unit') {
                                filteredData = currentObj[columnHeaders[k].key] + " " + currentObj.Unit + currentObj.UnitType;
                                excelObject[columnHeaders[k].key] = filteredData;
                                // console.log("column name" + columnHeaders[k].header + "value " + filteredData)
                            }
                            else if (columnHeaders[k].key == 'Amount') {
                                filteredData = "$ " + currentObj[columnHeaders[k].key];
                                excelObject[columnHeaders[k].key] = filteredData;
                                // console.log("column name" + columnHeaders[k].header + "value " + filteredData)
                            }
                            else {
                                filteredData = currentObj[columnHeaders[k].key];
                                excelObject[columnHeaders[k].key] = filteredData;
                                //console.log("column name" + columnHeaders[k].header + "value " + filteredData)
                            }
                        }
                    }
                    // Adding headers to the excel sheet.
                    if (valid) {
                        worksheet.columns = columnHeaders;
                        valid = false;
                    }
                    // Adding all reservation row values to the excel sheet.
                    worksheet.addRow(excelObject);
                }
                // Header properties
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                // Writing the response to the excel file and downloading it .
                workbook.xlsx.write(res).then(function () {
                    res.end();
                }).catch((err) => {
                    console.log(err);
                    res.send({ "errorMessage": "Failed" });
                });
            } else {
                res.send({ "errorMessage": "Failed" });
            }

        } else {
            res.send({ "errorMessage": "Module not found" })
        }
    })



})



/* This is a backend route to write data to excel and download it */

http.listen(process.env.PORT || config.port);
console.log("Server started");