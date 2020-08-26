const express = require('express');

const link = require('../model/link');

/**
 * Create application router
 * @returns {Object} Express application router
 */
module.exports = () => {

	// Create application router
	const applicationRouter = express.Router();

	// Redirect to the original URL when hash is present
	applicationRouter.get('/:hash', async (request, response, next) => {
		let foundLink = request.params.hash && await link.findOne(request.params);
		if (foundLink) {
			await link.updateOne({
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
