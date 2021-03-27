// express startup
const express = require('express');
var cors = require('cors');
const port = 8080;

// init the express
const app = express();
app.use(cors());
app.use(express.json());
  
// hook up the routers


// setup the logger
const utilities = require("./misc/utilities");
const logger = utilities.getLogger();

var server = app.listen(port, function () {
	console.log(`API server is listening on port ${port}...`);
    logger.info(`API server is listening on port ${port}...`);
});