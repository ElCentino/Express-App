
var express = require('express');
var cors = require('cors');
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

app.use(function(req, res, next) {

    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.use(express.static("./public/"));

app.use(cors());

app.get("/dictionary-api", function(req, res) {
    res.json(terms);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;