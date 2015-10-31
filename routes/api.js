var express = require('express');
var router = express.Router();
var request = require('request');

// mysql pool created and credentials stored in a resource file.
var pool = require('../resources/mysql');

// Request headers.
var headers = require('../resources/headers');

router.get('/test', function(req, res, next)
{
  //some function

  some_json = {body:"THis is the text that will be set"};

  res.json(some_json);

});

module.exports = router;