module.exports = function(app) {

  // var Usuario = app.models.usuario;

  var HomeController = {
    index: function(req, res) {
      res.render('home/index', {title: "Ntalk | Login"});
    },

    login: function(req, res) {
      var nome = req.body.usuario.nome;
      var email = req.body.usuario.email;

      if (nome && email){
        var usuario = req.body.usuario;
        usuario['contatos'] = [];
        req.session.usuario = usuario;
        res.redirect('/contatos');
      } else {
        res.redirect('/');
      }
    },

    logout: function(req, res) {
      req.session = null;
      res.redirect('/');
    }
  };

  return HomeController;

};
