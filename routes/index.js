var express = require('express');
var router = express.Router();

const controllers = require('../controllers/todo');

/* GET home page. */
router.get('/:id', controllers.findById);
router.post('/', controllers.create);

module.exports = router;
