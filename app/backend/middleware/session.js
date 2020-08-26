const { nanoid } = require('nanoid');

/**
 * Express middleware to create user session cookie
 * @param {Object} request Express request object
 * @param {Object} response Express response object
 * @param {Function} next Express next function
 */
module.exports = (request, response, next) => {
	response.locals.session = request.cookies.session || nanoid(20);
	response.cookie('session', response.locals.session, {
		maxAge: 31556952000, // 1 year
		httpOnly: true
	});
	next();
};
