module.exports = function(server)
{
  var request = require('request');

  var io = require('socket.io').listen(server);

  //socket.io listen commands

  io.on('connection', function (socket) 
  {
    socket.on('disconnect', function() {
      //
    });

  });

  return io
}