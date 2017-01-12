module.exports = function(app) {
  var ChatController = {
    index: function(req, res) {
      var resultado = {email: req.params.email
                     , usuario: req.params.usuario
                     , title: "Ntalk | Chat"};
      res.render('chat/index', resultado);
    }
  };
  return ChatController;
};
