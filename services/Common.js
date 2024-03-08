const passport = require("passport");

exports.isAuth = (req, res, next) => {

 return passport.authenticate('jwt')
};

exports.sanitizeUser = (user) => {

 return {id: user.id, email: user.email}
};

exports.cookieExtractor = function(req){
  // let token = null;
  // // if(req && req.cookies){
  // //   // token = req.cookies['jwt'];
  // // }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzE1YjUyMmU4YmI4NDQwZjI3ZTc3MSIsImVtYWlsIjoiYWhzYW5AeWFtYWlsLmNvbSIsImlhdCI6MTcwODYzMDQ2OH0.WuD9eginRXojHjj7r7RzLh4Rz_tDmPB9gK4OS27WAxY"

  return token;
}