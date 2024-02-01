const {Brand} = require("../model/BrandModel");

exports.fetchBrands = async (req, res) => {
    // this product we have to get from API body.
  
    try {
        const brands = await Brand.find({}).exec();
      res.status(200).json(brands);
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };