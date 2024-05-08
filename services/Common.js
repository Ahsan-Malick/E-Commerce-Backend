const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.sanitizeUser = (user) => {

 return {id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email}
};

exports.cookieExtractor = function(req){
  // let token = null;
  // if(req && req.cookies){
  //   token = req.cookies['jwt'];
  // }
  // console.log({token})
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjI5NjUzMWE5MDdhMjYxNzc4YjlmOSIsImZpcnN0bmFtZSI6IkFoc2FuIiwibGFzdG5hbWUiOiJKYXZlZCIsImVtYWlsIjoiYWhzYW5AeWFtYWlsLmNvbSIsImlhdCI6MTcxNDkzODE2Mn0.SqDIQRE8GFVgVdzzoOfvphKqX1hNVi9bz82b4V8xLAc"

  return token;
}