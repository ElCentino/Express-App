
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var terms = [
    {
        "title": "Rainbow",
        "description" : "It is made up of colours in the light spectrum"
    },

    {
        "title": "Camera",
        "description" : "It is made up of a lens"
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(function(req, res, next) {

    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.use(express.static("./public/"));

app.use(cors());

app.get("/dictionary-api", function(req, res) {
    res.json(terms);
});

app.post("/dictionary-api", function(req, res) {
    terms.push(req.body);
    res.json(terms);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;