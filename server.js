var express = require('express');
var wine = require('./routes/bmtips');

var port = process.env.VCAP_APP_PORT || 3000;

var app = express();

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

app.use(require('./routes/webpages'));

app.listen(port);
console.log('Listening on port '+ port +'...');
