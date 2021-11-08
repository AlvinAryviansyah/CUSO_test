const router = require('express').Router();
const visitorController = require('../controllers/visitorController.js');
const errorHandler = require('../middlewares/errorHandler');

router.post('/', visitorController.register);
router.get('/', visitorController.allVisitors);
router.patch('/:id', visitorController.editVisitor);
router.delete('/:id', visitorController.deleteVisitor);

router.use(errorHandler);

module.exports = router;