const {
  getMedicine,
  getDetailMedicene,
  getDetailMediceneById,
  getDetailMediceneByCategory,
  getDetailMediceneByName,
  getDetailMediceneByUnit,
  getDetailMediceneByStorageId,
  getDetailMediceneBySupplierId,
  newCreateMedicene,
  getUpdateMedicene,
  destroyMedicene,
} = require('../models/medicene');

const controller = {
  listMedicene: async (req, res) => {
    try {
      let category = await getMedicine();
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get List Medicene',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get List Medicene',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error.message,
      });
    }
  },

  detailMedicene: async function (req, res) {
    try {
      const sorting = req.query.sorting || 'ASC';
      const sort = req.query.sort || 'idMedicene';
      let category = await getDetailMedicene(sorting, sort);

      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Medicene',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Medicene',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  },

  detailMediceneByid: async function (req, res) {
    try {
      const { idMedicene } = req.params;
      let category = await getDetailMediceneById(idMedicene);
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Medicene By Id !!!',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Medicene',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  },
  detailMediceneByName: async function (req, res) {
    try {
      const { namaObat } = req.params;
      let category = await getDetailMediceneByName(namaObat);
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Medicene by Name Obat',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Medicene by NameObat',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  },

  detailMediceneByCategory: async function (req, res) {
    try {
      const { categoryId } = req.params;
      let category = await getDetailMediceneByCategory(categoryId);
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Medicene by ID Category',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Medicene by category ID',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  },
  detailMediceneByUnitId: async function (req, res) {
    try {
      const { unitId } = req.params;
      let category = await getDetailMediceneByUnit(unitId);
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Medicene by Unit ID !!',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Medicene by Unit ID!!',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  },
  detailMediceneByStorageId: async function (req, res) {
    try {
      const { storageId } = req.params;
      let category = await getDetailMediceneByStorageId(storageId);
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Medicene by Storage ID !!',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Medicene by Storage ID!!',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  },
  detailMediceneBySupplierId: async function (req, res) {
    try {
      const { supplierId } = req.params;
      let category = await getDetailMediceneBySupplierId(supplierId);
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Medicene by Supplier ID !!',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Medicene by Suplier ID !!',
          data: [],
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  },
  createMedicene: async function (req, res) {
    try {
      const { namaObat, categoryId, stock, unitId, storageId, tglKadeluarsa, hargaBeli, supplierId, hargaJual, keterangan } = req.body;
      let medicene = await newCreateMedicene(namaObat, categoryId, stock, unitId, storageId, tglKadeluarsa, hargaBeli, supplierId, hargaJual, keterangan);
      res.json({
        status: 201,
        message: 'Create Data Medicene Success !',
        data: medicene,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },
  updateMedicene: async function (req, res) {
    try {
      const { idMedicene } = req.params;
      const { namaObat, categoryId, stock, unitId, storageId, tglKadeluarsa, hargaBeli, supplierId, hargaJual, keterangan } = req.body;
      let medicene = await getUpdateMedicene(namaObat, categoryId, stock, unitId, storageId, tglKadeluarsa, hargaBeli, supplierId, hargaJual, keterangan, idMedicene);
      res.json({
        status: 200,
        message: 'Update Data Medicene Success',
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },
  deleteMedicene: async function (req, res) {
    try {
      const { idMedicene } = req.params;
      let medicene = await destroyMedicene(idMedicene);
      res.json({
        status: 200,
        message: 'Delete Data Medicene Success',
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  },
};

module.exports = controller;
