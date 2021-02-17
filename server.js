// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// init moment
var moment = require('moment'); // require
moment().format();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});
// Unfortunately, the version using MOMENT doesn't get accepted by FCC
// app.get("/api/timestamp/:uriDate", function (req, res) {
//   let uriDate = req.params.uriDate;
//   if(uriDate == "") {
//     validDate = moment();
//   } else if (!uriDate.match(/\D/)) {
//     uriDate = +uriDate;
//     validDate = moment(uriDate,'x', true);
//   } else {
//     validDate = moment(uriDate,'YYYY-MM-DD', true);
//   }
//   const parsedUnix = validDate.format("x");
//   let parsedDate = validDate.format("ddd, DD MMM YYYY HH:mm:ss") + " GMT";
//   if(validDate.isValid()) res.json({ unix: parsedUnix, utc: parsedDate });
//   else res.json({ error: "Invalid Date" });
// });

// Therefore I had to use NEW DATE version
app.get("/api/timestamp/:uriDate", function (req, res) {
  let uriDate = req.params.uriDate;
  if (/\d{5,}/.test(uriDate)) {
    const parsedUnix = parseInt(uriDate);
    res.json({ unix: parsedUnix, utc: new Date(parsedUnix).toUTCString() });
  } else {
    let parsedDate = new Date(uriDate);
    if (parsedDate.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: parsedDate.valueOf(), utc: parsedDate.toUTCString() });
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
