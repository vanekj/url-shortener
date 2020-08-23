const express = require('express'),
	{ customAlphabet } = require('nanoid');

/**
 * Create API router
 * @returns {Object} Express API router
 */
module.exports = () => {

	// Create API router
	const apiRouter = express.Router(); // eslint-disable-line new-cap

	// Create shortened link
	apiRouter.post('/link', async (request, response) => {
		let createdLink = await response.locals.models.link.create({
			hash: customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5)(),
			originalUrl: request.body.originalUrl,
			session: response.locals.session
		});
		response.json(createdLink);
	});

	// Get all links for session
	apiRouter.get('/link', async (request, response) => {
		let foundLinks = await response.locals.models.link.find({
			session: response.locals.session
		}).sort({
			createdAt: 'descending'
		});
		response.json(foundLinks);
	});

	// Return API router
	return apiRouter;

};
