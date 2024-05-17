const express = require("express");
const server = express();
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieSession = require("cookie-session");
const { cookieExtractor } = require("./services/Common");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require('path');
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
const authRouter = require("./routes/authRoute");
const { isAuth, sanitizeUser } = require("./services/Common");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("./model/UserModel");
const cors = require("cors");

const Key = "secret";
// const Key = process.env.KEY;
//JWT options
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = Key;
//middlewares

server.use(cors());
// server.use(express.static('build'));

server.use(express.static(path.resolve(__dirname, 'build')));
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
server.use("/carts", isAuth(), cartRouter);
server.use("/addresses", isAuth(), addressRouter);
server.use("/orders", isAuth(), orderRouter);
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});



//passport strategies //require for 1st login route
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    cb
  ) {
    //it gets username and password comming from client in req.body on the given route.
    try {
      const user = await User.findOne({ email: email }).exec();
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
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            // user.password comes from findOne req, which was already saved in hashed form. Hashedpassword is the incoming passowrd from client, which is encrypted.
            cb(null, false, { message: "Invalid Email or Password" });
          } else {

            cb(null, {id: user.id}); //this line makes req.user true and send the returned value to serializer.
          }
        }
      );
    } catch (error) {
      const user = await User.find();
      console.log({ message: error });
    }
  })
);
//then we can use jwt authentication on all other route as we aleady have a user token now
// The opts object configures how the JwtStrategy finds and decodes the JWT token.
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // require token from client to get user value on given route or take token value and convert that to the usernfo.
    //jwt_payload comes from sanitize(user) value.

    const id = jwt_payload.id;
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
  process.nextTick(function () {
    return cb(null, {id:user.id});
  });
});

//from token convert that token to user and make it useful on routes where jwt strategy is implemented as a middleware
//the deserializeUser function usually takes the ID (or other identifying information) from the jwt_payload and fetches the corresponding user object from your database.
//The fetched user object is then attached to the request as req.user
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}




server.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
