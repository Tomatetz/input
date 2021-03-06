
var fs = require('fs');
var bodyParser =  require("body-parser");
var express = require('express');
var servr = express();

servr.disable('etag');

var users = require('./users.json');
eval(fs.readFileSync('./scripts/dictionary.js')+'');

servr.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

servr.use( bodyParser.text() );

servr.post('/users/search/:val', function (req, res) {
    var param =req.params.val;
    var usersClone = users.slice(0);
    if(req.body!==''){
        var usersIdArray = req.body.split(',');
        usersClone = rebuildOutputList(usersClone, usersIdArray);
    }
    res.json(checkDictionaries(param, usersClone, 'groups'));
});

module.exports = servr;