
var fs = require('fs');
var express = require('express');
var servr = express();

servr.disable('etag');

var users = require('./users.json');

servr.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


servr.get('/users/search/', function (req, res, next) {
    res.json(users);
});
servr.get('/users/search/:val', function (req, res) {
    res.json(users);
});


module.exports = servr;