var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

router.get('/redirect', function(req, res, next) {
	res.json({});
});

module.exports = router;
