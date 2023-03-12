const router = require('express').Router();

const mediceneRouter = require('./medicene');
const categoryRouter = require('./category');

router.use('/medicene', mediceneRouter);
router.use('/category', categoryRouter);

module.exports = router;
