const { selectAll, newSupplier, updateSupplier, deleteSupplier} = require('../models/supplier');


const supplierController = {
  getAllProduct: async (req, res) => {
    try {
      const sortby = req.query.sortby || 'nama';
      const sort = req.query.sort || 'ASC';
      const searchingID = req.query.searchingID || '';
      const searchingName = req.query.searchingName || '';
      const result = await selectAll(sortby, sort, searchingID, searchingName);

      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({
          message: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

 createSupplier: async function (req, res) {
    try {
      const { Nama, Alamat } = req.body;
      let supplier = await newSupplier(Nama, Alamat);
      res.json({
        status: 201,
        message: 'Create Supplier Success !',
        data: supplier,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },

  updateNewSupplier: async function (req, res) {
    try { 
      const {ID} = req.params;
      const { Nama, Alamat } = req.body;
      let supplier = await updateSupplier(Nama, Alamat, ID);
      res.json({
        status: 201,
        message: 'Update Supplier Success !',
        data: supplier,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },

hapusSupplier: async function (req, res) {
    try { 
      const {ID} = req.params;
      let supplier = await deleteSupplier( ID);
      res.json({
        status: 201,
        message: 'Delete Supplier Success !',
        data: supplier,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },


};

module.exports = supplierController ;
