// var express = require('express');
// var db = require('./db');
var handler = require('../server-pure-sql/basic-server');
var dbConnection = require('./db/index.js');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

// var app = express();
// module.exports.app = app;

handler.server;

// Just for the sake of seeing values put in
var roomname = 'park';
var username = 'Jason';
var text = 'D3 is my favorite!!';
var thatRoomID = 2;
var thatUserID = 2;

exports.inputToDatabase = function(){
  dbConnection.connect(function(){
    console.log('connected');
  });

  dbConnection.query("INSERT INTO Rooms(roomname) VALUES('"+roomname+"');", function(err, rows, fields){});
  dbConnection.query("INSERT INTO Users(username) VALUES('"+username+"');", function(err, rows, fields){});
  dbConnection.query("INSERT INTO Messages(text,room_id, user_id) VALUES('" + text +"',"+ thatRoomID+ " , "+ thatUserID+ ");", function(err, rows, fields){
    // console.log("rows:", rows);
    // console.log('errors: ', err);
    // console.log('fields: ', fields);
  });
  thatRoomID++;
  thatUserID++;


  // dbConnection.end();

};

exports.retrieveFromDatabase = function() {
  dbConnection.connect(function() {
    console.log('connected');
  });

  // dbConnection.query("SELECT username FROM Users", function(err, users, fields) {
  //   console.log("these are the users we retrieved:", users);
  //   console.log("these are the fields of the table Users:", fields);
  // });
  // dbConnection.query("SELECT * FROM Messages", function(err, texts, fields) {
  //   console.log("these are the texts we retrieved:", texts);
  // });
  // dbConnection.query("SELECT roomname FROM Rooms", function(err, roomnames, fields) {
  //   console.log("these are the roomnames we retrieved:", roomnames);
  // });

  dbConnection.query("SELECT Messages.text FROM Messages \
                      RIGHT OUTER JOIN Users on (Messages.user_id = Users.user_id) \
                      ORDER BY Messages.id DESC);", function(err, stuff){

                    console.log('some stuff from retrieve from database: ', stuff);
                    })


  // dbConnection.end();

};

// inputToDatabase();
// retrieveFromDatabase();




// // Set what we are listening on.
// app.set("port", 3000);

// // Logging and parsing
// app.use(morgan('dev'));
// app.use(parser.json());

// // Set up our routes
// app.use("/classes", router);

// // Serve the client files
// app.use(express.static(__dirname + "/../client"));

// // If we are being run directly, run the server.
// if (!module.parent) {
//   app.listen(app.get("port"));
//   console.log("Listening on", app.get("port"));
// }

