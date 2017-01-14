module.exports = function(io) {
  var crypto = require('crypto');
  var sockets = io.sockets;

  sockets.on('connection', function(client) {
    var session = client.request.session;
    var usuario = session.usuario;
    client.email = usuario.email;

    var onlines = Object.keys(sockets.connected);
    onlines.forEach(function(online) {
      let on = sockets.sockets[online];
      client.emit('notify-onlines', on.email);
      client.broadcast.emit('notify-onlines', on.email);
    });

    client.on('join', function(sala) {
      console.log("TO NO JOIN");
      if(!sala) {
        var timestamp = new Date().toString();
        var md5 = crypto.createHash('md5');;
        sala = md5.update(timestamp).digest('hex');
      }
      console.log("JOIN..:");
      console.log(sala);
      console.log(session.sala);

      client.sala = sala;
      client.join(sala);
    });

    client.on('send-server', function(msg) {
      var sala = client.sala;
      var msg = "<b>"+ usuario.nome +":</b> "+ msg +"<br>";

      console.log('SEND-SERVER..:');
      console.log(sala);
      console.log(msg);

      if (sala){
        var data = {email: usuario.email, sala: sala};
        client.broadcast.emit('new-message', data);
        sockets.in(sala).emit('send-client', msg);
      } else {
        console.log("NAO HA SALA NO SEND-SERVER");
      }
    });

    client.on('disconnect', function() {
      client.broadcast.emit('notify-offline', usuario.email);
      var sala = client.sala;

      console.log('DISCONNECT..:');
      console.log(sala);

      if(sala){
        var msg = "<b>" + usuario.nome + "</b> saiu.<br>";
        sockets.in(sala).emit('send-client', msg);
        client.leave(sala);
      }
    });

  });
}
