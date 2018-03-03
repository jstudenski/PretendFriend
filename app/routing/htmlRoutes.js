var path = require("path");

module.exports = function(app) {

  app.get('/', function (req, res) {
    res.render('home');
  });
  
  app.get("/home", function(req, res) {
    res.render('home');
  });

  app.get("/survey", function(req, res) {
    res.render('survey');
  });
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.render('home');
  });

};
