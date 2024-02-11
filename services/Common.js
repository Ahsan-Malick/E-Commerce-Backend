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
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzhlZjdkYzI5NTU4NTYyNDgwMjRmZiIsImVtYWlsIjoiYWhzYW5AeW9vbWFpbC5jb20iLCJpYXQiOjE3MDc2Njc3Nzl9.uhV2LFUMamdtnZIiLY8K9YzinZr7sYCIWlLqdw7gdlA"

  return token;
}