module.exports = function(app) {
  var ChatController = {
    index: function(req, res) {
      var params = {sala: req.query.sala, title: "Ntalk | Chat"};
      res.render('chat/index', params);
    }
  };
  return ChatController;
};
