const express = require("express");
const server = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieSession = require("cookie-session");
const {cookieExtractor} = require("./services/Common");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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
const authRouter = require("./routes/authRoute")
const { isAuth, sanitizeUser } = require("./services/Common");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("./model/UserModel");
const cors = require("cors");

const Key = "secret";

//JWT options
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = Key;
//middlewares
// server.use(express.static('build'));
server.use(cors());
server.use(cookieParser()); //to read cookies comming from client request
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session")); //this middleware help to run deserializer
server.use(express.json()); //to parse req.body
server.use("/products", isAuth(), Router);
server.use("/brands", isAuth(), brandRouter);
server.use("/category", isAuth(), categoryRouter);
server.use("/user", isAuth(), userRouter);
server.use("/auth", authRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/addresses", addressRouter);
server.use("/order", isAuth(), orderRouter);
server.use("/", isAuth(), testRouter);

//passport strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    cb
  ) {
    //it gets username and password comming from client in req.body on the given route.
    console.log({ email: email });
    try {
      const user = await User.findOne({ email: email }).exec();
      console.log({ user: user });
      if (!user) {
        cb(null, false, { message: "Invalid Email or Password" });
      }
      crypto.pbkdf2(
        password, //coming in req.body from client
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) { // user.password comes from findOne req, which was already saved in hashed form. Hashedpassword is the incoming passowrd from client, which is encrypted. 
            cb(null, false, { message: "Invalid Email or Password" });
          } else {
            const token = jwt.sign(sanitizeUser(user), Key); //first arguement contains user info, second contains key and it converts user info and key into a token code.

            cb(null, token); //this line makes req.user true and send the returned value to serializer.
          }
        }
      );
    } catch (error) {
      console.log({ message: error });
    }
  })
);
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // require token from client to get user value on given route or take token value and convert that to the userInfo.
    //jwt_payload comes from sanitize(user) value.

    const id = jwt_payload.id;
    console.log(id);

    try {
      const user = await User.findById(id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      if (err) {
        return done(err, false);
      }
    }
  })
);

//serialize basically means to convert the incomming data structure to some common and easy to store form like JSON.
passport.serializeUser(function (user, cb) {
  console.log("serializer");
  process.nextTick(function () {
    return cb(null, user);
  });
});

//deserializer will convert that JSON data back to its original data structure. Need more explanation.
passport.deserializeUser(function (user, cb) {
  console.log("deserializer");
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
}

server.get("/chk", passport.authenticate("Jwt"), (req, res) => {
  res.json("success");
});

// server.post('/products', createProduct);

server.listen(8080, () => {
  console.log("server working");
});
