//add this middleware befor any route and after session middleware
module.exports = function (req, res, next) {
    res.locals.user = req.session.user;
    console.log(req.session.user)
    next();
  };
  