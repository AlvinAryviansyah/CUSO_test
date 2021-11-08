const router = require('express').Router();
const rentController = require('../controllers/rentController.js');
const errorHandler = require('../middlewares/errorHandler');

router.post('/', rentController.newRent);
router.get('/', rentController.allRents);
router.delete('/:id', rentController.returnBook);

router.use(errorHandler);

module.exports = router;