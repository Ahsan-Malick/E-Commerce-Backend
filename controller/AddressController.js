const { Address } = require("../model/AddressModel");

exports.fetchAddress = async (req, res) => {
  // this product we have to get from API body.

  let query = Address.find({});
  if (req.query.user) {
    query = query.find({ user: req.query.user });
  }
  if (req.query.email) {
    query = query.find({ email: req.query.email });
  }

  try {
    const address = await query.exec();
    res.status(200).json(address);
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.fetchAddressById = async (req, res) => {
  // this product we have to get from API body.

  const { id } = req.params;

  try {
    const address = await Address.findById(id);
    res.status(200).json(address);
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.createAddress= async (req, res) => {
  // this product we have to get from API body.

  const address = new Address(req.body);
  try {
    const doc = await address.save();
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAddress= async (req, res) => {
  // this product we have to get from API body.
  const {id} = req.params;
  try {
    const address = await Address.findByIdAndDelete(id);
    res.status(200).json('Deleted Successfully');
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};