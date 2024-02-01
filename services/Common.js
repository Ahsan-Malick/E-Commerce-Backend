// exports.isAuth = async (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// };

exports.isAuth = (req, res, next) => {

  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};