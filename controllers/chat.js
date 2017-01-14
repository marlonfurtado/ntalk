module.exports = function(app) {
  var ChatController = {
    index: function(req, res) {
      var params = {email: req.params.email, title: "Ntalk | Chat"};
      res.render('chat/index', params);
    }
  };
  return ChatController;
};
