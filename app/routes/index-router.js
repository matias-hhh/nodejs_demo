var express = require('express'),
  index = require('../controllers/index-controller'),
  router = express.Router();

 /*
  * Index route
  */
router.route('/').get(index);

module.exports = router;