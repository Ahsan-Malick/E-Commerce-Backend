const { User } = require("../model/UserModel");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/Common");
const jwt = require("jsonwebtoken");
const Key = "secret";


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
          req.login(sanitizeUser(doc), () => {
            //this also calls serializer and add to user
            if (err) {
              res.sendStatus(400).json(err);
            } else {
              const token = jwt.sign(sanitizeUser(doc), Key); //it converts user info and key into a token code.
              res.cookie("jwt", token, {
                expires: new Date(Date.now() + 360000),
                httpOnly: true,
              });
              res.status(201).json(token);
            }
          });
        }
      );
    } catch (err) {
      // Add the 'err' parameter here
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.loginUser = async (req, res) => {
    try {
      res.cookie("jwt", req.user, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
      });
      res.json({ status: "Login successfully", token: req.user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  ``;
  exports.checkUser = async (req, res) => {
    try {
      console.log({userInfo:  req.user})
      res.json({ status: "success", user: req.user });
    } catch (err) {
      res.sendStatus(400).json({ error: err.message });
    }
  };