async function loggedRoute(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
async function adminRoute(req, res, next) {
	if (req.user.admin === '1') {
		return next();
	} else {

		res.redirect('/');
	}
}

async function notLoggedRoute(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}



module.exports.loggedRoute = loggedRoute
module.exports.adminRoute = adminRoute
module.exports.notLoggedRoute = notLoggedRoute