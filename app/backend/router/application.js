const express = require('express');

const link = require('../model/link');

const applicationRouter = express.Router();

/**
 * Listen to GET /link/:hash route and redirect to the original URL
 */
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

module.exports = applicationRouter;
