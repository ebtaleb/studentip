var express = require('express');
var app = express();

var wineController = require('./routes/rest');
var routes = require('./routes/index'); 

app.use(require('express').static(__dirname + '/public'));

app.use('/', routes);
app.use('/api', wineController);

module.exports = app;
