let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
//var webpackHotMiddleware = require('webpack-hot-middleware')
let config = require('./webpack.config');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let httpModule = require('http');

let app = new (express)();

let http = httpModule.createServer(app);

let port = 3001;

let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath}));
//app.use(webpackHotMiddleware(compiler))

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(path.join(__dirname + '/')));

app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get("/indexDev.html", function (req, res) {
    res.sendFile(__dirname + '/indexdev.html')
});

app.get("/indexdev.html", function (req, res) {
    res.sendFile(__dirname + '/indexdev.html')
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

let request = require("request");
app.use('/api', function (req, res) {
    console.log(req.url);
    let url = 'http://localhost:1339/api';
    let r = null;
    if (req.method === 'POST') {
        req.pipe(request.post({url: url, form: req.body}), {end: false}).pipe(res);
        //r = request.post({ uri: url, json: req.body });        
        //r = request.post({uri: url, query:{data: req.query.data}});
    } else {
        r = request(url);
        req.pipe(r).pipe(res);
    }

});

// app.listen(port, function (error) {
//     if (error) {
//         console.error(error)
//     } else {
//         console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
//     }
// })


http.listen(port || 1339);