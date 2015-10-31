var express = require('express');
var router = express.Router();
var request = require('request');
var philipsAcc = require('../resources/philips');

// mysql pool created and credentials stored in a resource file.
var pool = require('../resources/mysql');

// Request headers.
var headers = require('../resources/headers');

function getAuthToken(uid, callback)
{
  pool.getConnection(function(err, conn) {
    if(err)
    {
      console.log(err);
      return
    }
    conn.query('SELECT token,token_time FROM users WHERE uid = ?',uid,
      function(err, result) {
        if(err)
        {
          console.log(err);
          return;
        }
        if(typeof result[0] != 'undefined' && (result[0].token_time + 7200) > Math.floor(new Date() / 1000))
        {
          conn.release();
          callback(result[0].token);
        } else {
          reqAuthToken(uid, function(body)
          {
            user = [body["userID"], body["access_token"], Math.floor(new Date() / 1000)]
            conn.query('REPLACE INTO users (`uid`,`token`,`token_time`) VALUES (?,?,?)',
              user, function(err, result) {
                conn.release();
                if(err)
                  console.log(err);
                callback(user[1]);
              })
          });
        }
    });
  });
}

function reqAuthToken(uid, callback)
{
  var options = {
    url: 'https://www.measuretomotivate.philips.com/api/auth',
    headers: headers,
    form: {"username":philipsAcc[uid].username,"password":philipsAcc[uid].password}
  };
  //callback(options);
  request.post(options, function(err, res, body)
  {
    callback(JSON.parse(body));
  });
}

router.get('/test', function(req, res, next)
{
  //some function

  some_json = {body:"<div id=main>Test</div>",main: "New Main"};

  res.json(some_json);

});

router.get('/tokentest/:uid', function(req, res, next)
{
  getAuthToken(req.params.uid, function(result) 
  {
    res.json(result);
  });  
});

router.get('')

module.exports = router;