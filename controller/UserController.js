const { User } = require("../model/UserModel");
const crypto = require("crypto");

exports.fetchUser = async (req, res) => {
  // this product we have to get from API body.

  let query = User.find({});
  if (req.query.email) {
    query = query.find({ email: req.query.email });
  }

  try {
    const user = await query.exec();
    res.status(201).json(user);
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({
          ...req.body,
          password: hashedPassword,
          salt: salt,
        });
        const doc = await user.save();
        res.status(201).json(doc);
      }
    );
  } catch (err) {
    // Add the 'err' parameter here
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.checkUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
