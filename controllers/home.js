module.exports = function(app) {

  // var Usuario = app.models.usuario;

  var HomeController = {
    index: function(req, res) {
      res.render('home/index', {title: "Ntalk | Login"});
    },

    login: function(req, res) {
      var nome = req.body.usuarionome;
      // var email = req.body.usuario.email;

      if (nome){
        // var usuario = req.body.usuario;
        // usuario['contatos'] = [];
        req.session.usuario = nome;
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
