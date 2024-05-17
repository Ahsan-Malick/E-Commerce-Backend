const { User } = require("../model/UserModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
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
          console.log({hashedPassword})
          const doc = await user.save();
          req.login(sanitizeUser(doc), () => {
            //this also calls serializer and add to user, creates a session for
            if (err) {
              res.sendStatus(400).json(err);
            } else {
              const token = jwt.sign(sanitizeUser(doc), Key); //it converts user info and key into a token code.
              res.cookie("jwt", token, {
                expires: new Date(Date.now() + 360000),
                httpOnly: true,
                sameSite: "strict"
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
    const id = req.user
    const token = jwt.sign(id, Key);
    try {
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
        sameSite: "strict"
      });
      res.json({ status: "Login successfully", token: req.user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  ``;
  exports.checkUser = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const existinghashedPassword = req.user.id;
    const user = await User.findById(req.user.id);
    console.log(user.password);
    bcrypt.compare(currentPassword, existinghashedPassword, function(err, isMatch) {
      if (err) {
        res.status(500).json({ message: 'An error occurred', err });
      } else if (!isMatch) {
        res.status(400).json({ message: 'Invalid password' });
      } else {
        console.log('password matched successfully')
      }
    });
  };

  exports.updateUserName = async (req, res) => {
    const { firstname, lastname } = req.body;
    const userId = req.user.id;
    console.log(req.body)
  
    try {
      const user = await User.findOneAndUpdate({ _id: userId },{$set: {firstname:firstname, lastname:lastname}},{new: true});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };

  exports.updatePassword = async(req,res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    let existinghashedPassword = req.user.password;
   const user = await User.findById(userId);
   //in the following function the current passowrd is hashed using the salt of the user and then compared with the existing hashed password.
    crypto.pbkdf2(currentPassword, user.salt, 310000, 32, "sha256", async function (err, hashedPassword) {
      if (!crypto.timingSafeEqual(existinghashedPassword, hashedPassword)) {
        res.status(400).json({ message: 'Invalid password' });
      } else {
        try {
          const salt = crypto.randomBytes(16);
          crypto.pbkdf2(
            newPassword,
            salt,
            310000,
            32,
            "sha256",
            async function (err, hashedPassword) {
              const user = await User.findOneAndUpdate({ _id: userId },{$set: {password:hashedPassword, salt:salt}},{new: true});
              res.status(200).json({ message: 'Password updated successfully'});
            }
          );
        } catch (error) {
          res.status(500).json({ message: "Error Caught", error});
        }
      }
    
 });
  }

  exports.authCheck = async(req,res)=>{
    console.log("m here")
    if(req.user){
    res.json(req.user)
    }
  else{
    res.sendStatus(401);
  }

  }

  exports.clearCookies = async(req,res)=>{
    res.clearCookie('jwt');
    res.send({ message: 'Logout successful' });
  }