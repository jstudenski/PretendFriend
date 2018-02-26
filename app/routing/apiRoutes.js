var friendData = require("../data/friends");
var randomNames = require("../data/randomNames");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.get("/api/random", function(req, res) {
    res.json(randomNames);
  });

// // Create New Reservation - takes in JSON input
// app.post("/api/new", function(req, res) {

//   var newReservation = req.body;

//   console.log(newReservation);

//   reservations.push(newReservation);

//   res.json(newReservation);
// });



  app.post("/api/friends", function(req, res) {

    //var newFriend = req.body;
    //console.log(newFriend);
    //friendData.push(newFriend);
    //res.json(friendData);
    console.log(req.body);
    friendData.push(req.body);
    res.json(friendData);
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    // if (tableData.length < 5) {
    //   tableData.push(req.body);
    //   res.json(true);
    // }
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   tableData = [];
  //   waitListData = [];

  //   console.log(tableData);
  // });
};
