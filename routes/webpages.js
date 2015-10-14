
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
//var cfenv = require('cfenv');

// create a new express server
var app = require('express')();

// serve the files out of ./public as our main files
app.use(require('express').static(__dirname + '/public'));

// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();

app.get('/', function(req, res) { res.sendFile('index.html'); });
module.exports = app;

//var port = appEnv.port || 2000;

// start server on the specified port and binding host
//app.listen(appEnv.port, function() {
//app.listen(port, function() {
  //console.log("server starting on " + appEnv.url);
//});
