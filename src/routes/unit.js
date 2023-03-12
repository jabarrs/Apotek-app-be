const express = require('express');
const router = express.Router();
const controller = require('../controllers/unit');

router.get('/', controller.getAllProduct);
// router.get('/:id', controller.product.detailProduct);
router.post('/', controller.createUnit);
router.put('/:unitId', controller.updateUnit);
router.delete('/:unitId', controller.hapusUnit);

module.exports = router;
