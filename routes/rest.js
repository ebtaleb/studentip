var express = require('express');
var tips = require('./tips');

var router = express.Router();

router.get('/tips', tips.findAll);
router.get('/tips/:id', tips.findById);
router.post('/tips/:id/comments', tips.addComment);
router.post('/tips', tips.addTip);
router.put('/tips/:id', tips.updateTip);
router.delete('/tips/:id', tips.deleteTip);

module.exports = router;
