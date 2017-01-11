module.exports = function(req, res) {

  var ContatoController = {
    index: function(req, res) {
      var usuario = req.session.usuario;
      var params = {title: 'Ntalk | Contatos', usuario: usuario};

      res.render('contatos/index', params);
    }
  }
  return ContatoController;
};
