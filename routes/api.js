var express = require('express');
var router = express.Router();
var request = require('request');

// mysql pool created and credentials stored in a resource file.
var pool = require('../resources/mysql');

// Request headers.
var headers = require('../resources/headers');



module.exports = router;