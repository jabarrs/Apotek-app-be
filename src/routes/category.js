const router = require('express').Router();
const controller = require('../controllers/category');

router.get('/', controller.detailCategory);
router.post('/', controller.createCategory);
router.put('/:categoryId', controller.updateCategory);
router.delete('/:categoryId', controller.deleteCategory);

module.exports = router;
