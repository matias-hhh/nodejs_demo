var express = require('express'),
  persons = require('../controllers/persons-controller'),
 router = express.Router();

/**
 *  Persons-route
 */
router.route('/persons')

  .get(persons.list)
  .post(persons.create);

router.route('/persons/:personId')

  .get(persons.read)
  .put(persons.update)
  .delete(persons.delete);

module.exports = router;