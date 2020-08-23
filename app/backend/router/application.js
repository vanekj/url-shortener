const express = require('express');

/**
 * Create application router
 * @returns {Object} Express application router
 */
module.exports = () => {

	// Create application router
	const applicationRouter = express.Router(); // eslint-disable-line new-cap

	// Redirect to the original URL when hash is present
	applicationRouter.get('/:hash', async (request, response, next) => {
		let foundLink = request.params.hash && await response.locals.models.link.findOne(request.params);
		if (foundLink) {
			await response.locals.models.link.updateOne({
				hash: foundLink.hash
			}, {
				$inc: {
					views: 1
				}
			});
			response.redirect(302, foundLink.originalUrl);
		} else {
			next();
		}
	});

	// Return application router
	return applicationRouter;

};
