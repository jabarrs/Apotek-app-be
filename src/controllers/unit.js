const { selectAll, newUnit,updateUnit, deleteUnit } = require('../models/unit');

const unitController = {
  getAllProduct: async (req, res) => {
    try {
      const sortby = req.query.sortby || 'nameUnit';
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

  createUnit: async function (req, res) {
    try {
      const { unitId, nameUnit } = req.body;
      let unit = await newUnit(unitId, nameUnit);
      res.json({
        status: 201,
        message: 'Create Unit Success !',
        data: unit,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },


  updateUnit: async function (req, res) {
    try { 
      const {unitId} = req.params;
      const {  nameUnit} = req.body;
      let unit = await updateUnit(unitId, nameUnit);
      res.json({
        status: 201,
        message: 'Update Unit Success !',
        data: unit,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },

  hapusUnit: async function (req, res) {
    try { 
      const {unitId} = req.params;
      let unit = await deleteUnit(unitId);
      res.json({
        status: 201,
        message: 'Delete Supplier Success !',
        data: unit,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },



};



module.exports = unitController;
