var express = require('express');
var wine = require('./bmtips');

var router = express.Router();

router.get('/wines', wine.findAll);
router.get('/wines/:id', wine.findById);
router.post('/wines', wine.addWine);
router.put('/wines/:id', wine.updateWine);
router.delete('/wines/:id', wine.deleteWine);

module.exports = router;
