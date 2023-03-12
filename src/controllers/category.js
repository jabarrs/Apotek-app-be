const { getCategory, getDetailCategory, newCreateCategory, getUpdateCategory, destroyCategory } = require('../models/category');
const controller = {
  listCategory: async (req, res) => {
    try {
      let category = await getCategory();
      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get List Category',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get List Category',
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
  detailCategory: async function (req, res) {
    try {
      const { categoryId, nameCategory } = req.query || '';
      const sorting = req.query.sorting || 'ASC';
      let category = await getDetailCategory(categoryId, nameCategory, sorting);

      if (category.length > 0) {
        res.json({
          status: 200,
          message: 'Get Detail Category',
          data: category,
        });
      } else {
        res.json({
          status: 404,
          message: 'Cannot Get Detail Category',
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
  createCategory: async function (req, res) {
    try {
      const { categoryId, nameCategory } = req.body;
      let category = await newCreateCategory(categoryId, nameCategory);
      res.json({
        status: 201,
        message: 'Create Data Category Success !',
        data: category,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  },
  updateCategory: async function (req, res) {
    try {
      const { categoryId } = req.params;
      const { nameCategory } = req.body;
      let category = await getUpdateCategory(nameCategory, categoryId);
      res.json({
        status: 200,
        message: 'Update Data Category Success',
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  },

  deleteCategory: async function (req, res) {
    try {
      const { categoryId } = req.params;
      let category = await destroyCategory(categoryId);
      res.json({
        status: 200,
        message: 'Delete Data Category Success',
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
