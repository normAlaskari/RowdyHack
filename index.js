// read config
require('dotenv').config();

// express makes web services for node easy
const express = require('express');
var cors = require('cors');
const port = process.env.PORT || 8080;
const DBUser = process.env.DBUser;
const DBPass = process.env.DBPass;
const DB = "cs4783_rta149";
const api_key = process.env.APIKEY;
var mysql = require('mysql');

// init the express
const app = express();
app.use(cors());
app.use(express.json());

var pool  = mysql.createPool({
    connectionLimit : 2,
    host: "https://cs3743.fulgentcorp.com/",
    user: DBUser,
    password: DBPass,
    database: DB
  });
  
  pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });
  

// hook up the routers
// property router handles all the routes that work with properties
const propertyRouter = require('./routes/property');
app.use('/properties', propertyRouter);
// swagger router handles any swagger calls
const swaggerRouter = require('./routes/swagger');
app.use('/swagger.json', swaggerRouter);
// hello is misc functionality so throw it in its own router
const helloRouter = require('./routes/hello');
app.use('/hello', helloRouter);

// setup the logger
const utilities = require("./misc/utilities");
const logger = utilities.getLogger();

var server = app.listen(port, function () {
	console.log(`API server is listening on port ${port}...`);
    logger.info(`API server is listening on port ${port}...`);
});