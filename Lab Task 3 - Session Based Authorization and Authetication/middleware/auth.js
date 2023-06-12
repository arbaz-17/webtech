const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user.role; // Assign the user role from the session to the request object
    next();
  } else {
    res.redirect('/');
  }
};


module.exports = isAuthenticated;
