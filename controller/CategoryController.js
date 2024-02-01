const {Category} = require("../model/CategoryModel");

exports.fetchCategory = async (req, res) => {
    // this product we have to get from API body.
  
    try {
        const category = await Category.find({}).exec();
      res.status(201).json(category);
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };