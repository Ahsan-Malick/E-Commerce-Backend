const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.sanitizeUser = (user) => {

 return {id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email}
};

exports.cookieExtractor = function(req, res){
  let token = null;
  if(req && req.cookies){
    token = req.cookies['jwt'];
  }
 



  return token;
}