
const express = require("express");
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
var api_routes_1 = require("./routing/api.routes");
var db_config_1 = require("./database/db.config");
var schedule = require("node-schedule");
var deamon_controller_1 = require("./controllers/deamon.controller");
const app = express();


const port = process.env.PORT || 8080;
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// api router endpoint
app.use('/api', api_routes_1.ApiRoute);

// CORS Middleware
app.use(cors());

//index route

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

// handling a daemon job
var date = new Date();
var rule = { hour: 16, minute: 5, dayOfMonth: 29, month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] };
// setInterval(() => {
//     DeamonController.autoGenerateInvoice();
//     DeamonController.cleanRecentInvoiceDB();
// }, 10000)
schedule.scheduleJob(rule, function () {
    deamon_controller_1.DeamonController.autoGenerateInvoice();
});
app.listen(port, function () {
    db_config_1.connectMongoDB();
    console.log("Listening at port :" + port);
});
