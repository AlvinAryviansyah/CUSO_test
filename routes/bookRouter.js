const router = require('express').Router();
const bookController = require('../controllers/bookController.js');
const errorHandler = require('../middlewares/errorHandler');

router.post('/', bookController.addBook);
router.get('/', bookController.allBooks);
router.patch('/:id', bookController.editBook);
router.delete('/:id', bookController.deleteBook);

router.use(errorHandler);

module.exports = router;