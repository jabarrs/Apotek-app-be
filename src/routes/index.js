const router = require('express').Router();

const mediceneRouter = require('./medicene');
const categoryRouter = require('./category');
const buyingRouter = require("./buying");
const sellingRouter = require("./selling");
const usersRouter = require("./users");


router.use('/medicene', mediceneRouter);
router.use('/category', categoryRouter)
.use("/users", usersRouter)
.use("/selling", sellingRouter)
.use("/buying", buyingRouter);


module.exports = router;
