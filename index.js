const express = require("express");
const server = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require('express-session');
const crypto = require("crypto");
const mongoose = require("mongoose");
const { createProduct } = require("./controller/ProductsController");
const Router = require("./routes/ProductRoute");
const brandRouter = require("./routes/BrandRoute");
const categoryRouter = require("./routes/CategoryRoute");
const userRouter = require("./routes/UserRoute");
const cartRouter = require("./routes/CartRoute");
const addressRouter = require("./routes/AddressRoute");
const orderRouter = require("./routes/OrderRoute");
const testRouter = require("./routes/testRoute");
const {isAuth} = require('./services/Common');
const { User } = require("./model/UserModel");
const cors = require("cors");

//middlewares
server.use(cors());
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
server.use(passport.authenticate('session')); //this middleware help to run deserializer
server.use(express.json()); //to parse req.body
server.use("/products", isAuth, Router);
server.use("/brands", brandRouter);
server.use("/category", categoryRouter);
server.use("/user", userRouter);
server.use("/cart", cartRouter);
server.use("/addresses", addressRouter);
server.use("/order", orderRouter);
server.use("/", testRouter);

//passport strategies
passport.use(
  new LocalStrategy(async function (username, password, cb) {
    try {
      const user = await User.findOne({ email: username }).exec();
      if(!user){
        cb(null, false, {message: 'Invalid Email or Password'})
      };
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if(!crypto.timingSafeEqual(user.password, hashedPassword)){
            cb(null, false, {message:'Invalid Email or Password' })
          }
          else {
            cb(null, user) //this line sends to serializer
          }
        });
    
    } catch (error) {console.log({message:error})};
  })
);

//this creates session variable req.user on being called from callbacks
passport.serializeUser(function(user, cb){
  console.log('serializer')
    process.nextTick(function(){
        return cb(null, {id:user.id, email: user.email});
    })
});

passport.deserializeUser(function(user, cb){
  console.log('deserializer')
  process.nextTick(function(){
      return cb(null, user);
  })
})

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
}

server.get("/", (req, res) => {
  res.json("success");
});


// server.post('/products', createProduct);

server.listen(8080, () => {
  console.log("server working");
});
