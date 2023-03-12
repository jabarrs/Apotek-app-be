const express = require('express');
const router = express.Router();
const controller = require('../controllers/supplier');

router.get('/', controller.getAllProduct);
// router.get('/:id', controller.product.detailProduct);
router.post('/', controller.createSupplier);
router.put('/:ID', controller.updateNewSupplier);
router.delete('/:ID', controller.hapusSupplier);

module.exports = router;
