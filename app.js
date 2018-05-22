
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

app.delete("/dictionary-api/:terms", function(req, res) {
    terms = terms.filter(function(des) {
        return (des.title.toLowerCase() !== req.params.terms.toLowerCase());
    });

    res.json(terms);
});

const server = app.listen(process.env.PORT || 3000, function(err) {
    if(err) throw err;
    
    console.log("Express app running");
});

module.exports = app;
