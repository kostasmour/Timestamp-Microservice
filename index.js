// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api", function (req, res) {
  var date = new Date()
  res.json({ unix: date.valueOf(), utc: date.toUTCString()});
});

app.get("/api/:date", function (req, res) {
  var date = req.params.date; // get input
  if(date.match(/\d{5,}/)){ // check if input has 5 or more consecutive
    var date = parseInt(date); // turn string into number
  }
    var value = new Date(date) // change number into date
  
  if(value.toUTCString() == "Invalid Date"){ // check if date is not valid
    res.json({ error: value.toUTCString()}) // print Invalid Date
  }
  res.json({ unix: value.valueOf(), utc: value.toUTCString() }); //print values
});
