var express = require('express');
const fileController = require('../controllers/fileController');
var router = express.Router();

/* GET home page. */
router.post('/', fileController.getRoot);

module.exports = router;
