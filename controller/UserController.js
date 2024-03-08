const { User } = require("../model/UserModel");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/Common");
const jwt = require("jsonwebtoken");
const Key = "secret";

exports.fetchUser = async (req, res) => {
  // this product we have to get from API body.
  const id = req.user.id;
  let query = User.findById(id);
  // if (req.query.email) {
  //   query = query.find({ email: req.query.email });
  // }
  try {
    const user = await query.exec();
    res.status(201).json(sanitizeUser(user));
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};


