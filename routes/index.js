const router = require('express').Router();
const visitorRouter = require('./visitorRouter');
const bookRouter = require('./bookRouter');
const rentRouter = require('./rentRouter');

router.get('/', (req, res) => {
    res.send("Hello World")
})

router.use('/visitors', visitorRouter);
router.use('/books', bookRouter)
router.use('/rents', rentRouter)
module.exports = router;