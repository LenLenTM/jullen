function authSession(req, res, next) {
    if (!req.session.authenticate) {
        return res.redirect('/index.html'); // Redirect to login page
    }
    next(); // User is authenticated, continue to the next middleware/route handler
}

module.exports = authSession;