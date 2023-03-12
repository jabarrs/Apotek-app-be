const router = require('express').Router();

const mediceneRouter = require('./medicene');
const categoryRouter = require('./category');
const buyingRouter = require("./buying");
const sellingRouter = require("./selling");
const usersRouter = require("./users");
const supplierRouter = require("./supplier");
const unitRouter = require("./unit")


router.use('/medicene', mediceneRouter)
.use('/category', categoryRouter)
.use("/users", usersRouter)
.use("/selling", sellingRouter)
.use("/buying", buyingRouter)
.use("/supplier", supplierRouter)
.use("/unit", unitRouter);


module.exports = router;
