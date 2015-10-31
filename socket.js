module.exports = function(server)
{
  var request = require('request');

  var io = require('socket.io').listen(server);

  function placeQuery(socket, data, callback)
  {
    var query = {};
    if(typeof data.location == 'undefined' && (typeof data.lat == 'undefined' || typeof data.lon == 'undefined'))
    {
      callback('One or more of location or lat/lon must be given',"");
      return;
    }
    var headers = {
      'User-Agent': 'IW/0.0.1',
      'Content-Type': 'application/x-www-fomr-urlencoded'
    };
    var options = {
      url: 'https://api.foursquare.com/v2/venues/search',
      method: 'GET',
      headers: headers,
      qs: {limit: 1, oauth_token: foursquare_oauth, v: 20140806, m: 'swarm'}
    };
    if(typeof data.location != 'undefined')
      options.qs.query = data.location;
    if((typeof data.lat != 'undefined' && typeof data.lon != 'undefined') && !isNaN(data.lat) &&
     !isNaN(data.lon) && Math.abs(data.lat) <= 90 && Math.abs(data.lon <=180))
    {
      options.qs.ll = data.lat + "," + data.lon;
      options.qs.intent = "checkin";
    } else {
      options.qs.intent = "global";
    }
    request(options, function(err,response,body) {
      if(err)
      {
        callback('foursquare error',"");
        return;
      }
      venues = JSON.parse(body).response.venues;
      if(typeof venues == 'undefined')
      {
        callback('venue not found',"");
        return;
      }
      venue = venues[0];
      // writeVenue(venue.id, venue.name, venue.categories[0].icon, venue.location.formattedAddress, 
      //           venue.location.lat, venue.location.lng, venue.url, '');
      callback(venue.name);
    });
  }

  function foursquareIdExpand(shortID, callback)
  {
    var headers = {
      'User-Agent': 'IW/0.0.1',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    var options = {
      url: 'https://api.foursquare.com/v2/checkins/resolve',
      method: 'GET',
      headers: headers,
      qs: {shortId: shortID, oauth_token: foursquare_oauth, v: 20140806, m: 'swarm'}
    };
    request(options, callback);
  }

  var stream = T.stream('statuses/filter', {track: 'swarmapp'});

  stream.on('disconnect', function (disconMsg) 
  {
    console.log("------------------------------------------------------------------------------------------------- Disconnect: --------------------------------------------------------------------------------------------");
    console.log(disconMsg);
  });

  stream.on('error', function (error) 
  {
    console.log("------------------------------------------------------------------------------------------------- Error: -------------------------------------------------------------------------------------------------");
    console.log(error);
  });

  //socket.io listen commands

  io.on('connection', function (socket) 
  {
    socket.on('disconnect', function() {
      //stream.removeListener('tweet', onTweet);
    });
    var venueSearch = "";
    var userSearch = "";

    function onTweet(tweet)
    {
      if(venueSearch != "" && tweet.text.indexOf(venueSearch) >= 0)
      {
        var user = {name: tweet.user.name, username: tweet.user.screen_name,
                    location: tweet.user.location, img: tweet.user.profile_image_url,
                    description: tweet.user.description};
        socket.emit('place/users', user);
      }
      if(userSearch != "" && tweet.user.screen_name == userSearch)
      {
        var checkin;
        tweet.entities.urls.forEach(function(val, index, array) {
          if(val.display_url.substring(0,12) == 'swarmapp.com')
            checkin = val.display_url.substring(15);
        });
        if(checkin != "")
        {
          foursquareIdExpand(checkin, function(err, response, body) {
            if(err)
            {
              socket.emit('err',{error: "foursquare error"});
            } else {
              checkin = JSON.parse(body).response.checkin;
              var category = {};
              checkin.venue.categories.some(function(val, index, array) {
                if(val.primary)
                {
                  category = {name: val.name, icon: val.icon.prefix + 64 + val.icon.suffix};
                  return true;
                }
              });
              var push = {};
              push.venue_id = checkin.venue.id;
              push.venue = checkin.venue.name;
              push.img = category.icon;
              push.category = category.name;
              push.address = (typeof checkin.venue.location.formattedAddress != 'undefined') ? 
                                  checkin.venue.location.formattedAddress : [];
              push.lat = checkin.venue.location.lat;
              push.lon = checkin.venue.location.lng;
              push.url = checkin.venue.url ? checkin.venue.url : "";
              push.description = checkin.venue.description ? checkin.venue.description : "";

              socket.emit('user/places',push);
            }
          });
        }
      }
    }

    socket.on('place/users', function(data) {
      placeQuery(socket, data, function(err, back) {
        if(err)
        {
          socket.emit('err',{error: err});
          venueSearch = "";
        } else {
          venueSearch = back;
        }
      });
    });

    socket.on('user/places', function(data) {
      if(typeof data.user == "string")
      {
        userSearch = data.user;
      } else {
        socket.emit('err',{error: "user must be defined"});
        userSearch = "";
      }
    });

    socket.on('clear', function(data) {
      venueSearch = "";
      userSearch = "";
    })

    stream.on('tweet', onTweet);

    // stream.on('delete', function (tweet) 
    // {
    //   socket.emit('tweet', tweet);
    // });

    // stream.on('limit', function (limitMsg) 
    // {
    //   socket.emit('tweet', limitMsg);
    // });

    // stream.on('scrub_geo', function (scrubGeoMsg) 
    // {
    //   socket.emit('tweet', scrubGeoMsg);
    // });

    // socket.on('user/places', function (data) 
    // {
    //   socket.emit();
    // });
  });

  return io
}