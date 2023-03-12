const router = require('express').Router();
const controller = require('../controllers/medicene');

router.get('/', controller.detailMedicene);
router.get('/:idMedicene', controller.detailMediceneByid);
router.get('/nameObat/:namaObat', controller.detailMediceneByName);
router.get('/categoryMedicene/:categoryId', controller.detailMediceneByCategory);
router.get('/supplierIdMedicene/:supplierId', controller.detailMediceneBySupplierId);
router.get('/unitIdMedicene/:unitId', controller.detailMediceneByUnitId);
router.get('/storageIdMedicene/:storageId', controller.detailMediceneByStorageId);
router.post('/', controller.createMedicene);
router.put('/:idMedicene', controller.updateMedicene);
router.delete('/:idMedicene', controller.deleteMedicene);

module.exports = router;
