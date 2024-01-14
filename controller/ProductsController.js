//CRUD operations are in controllers

const { Product } = require("../model/ProductsModel");

exports.createProduct = async (req, res) => {
  // this product we have to get from API body.

  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.fetchAllProducts = async (req, res) => {
  let prodQuery = Product.find({});
  let docsQuery = Product.find({});
  if (req.query.brand) {
    prodQuery = prodQuery.find({ brand: req.query.brand });
    docsQuery = docsQuery.find({ brand: req.query.brand });
  }
  if (req.query.category) {
    prodQuery = prodQuery.find({ category: req.query.category });
    docsQuery = docsQuery.find({ category: req.query.category });
  }
  if (req.query._sort && req.query._order) {
    prodQuery = prodQuery.sort({ [req.query._sort]: req.query._order });
    // docsQuery = docsQuery.sort({[req.query._sort]: req.query._order });
  }

  if (req.query._page && req.query._limit) {
    const page = req.query._page;
    const pageSize = req.query._limit;
    prodQuery = prodQuery.skip((page - 1) * pageSize).limit(pageSize);
    docsQuery = docsQuery.skip((page - 1) * pageSize).limit(pageSize);
  }

  try {
  const totalDocs = await docsQuery.count().exec();
  res.set("X-Total-Count", totalDocs);
  } catch(err){
    res.status(404).json({error: err.message})
  }

  try {
    const docs = await prodQuery.exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
