const express = require('express'),
	nanoid = require('nanoid');

const link = require('../model/link'),
	linkSchema = require('../schema/link');

/**
 * Create API router
 * @returns {Object} Express API router
 */
module.exports = () => {

	// Create API router
	const apiRouter = express.Router();

	// Create shortened link
	apiRouter.post('/link', async (request, response) => {
		let createdLink = await link.create({
			hash: nanoid.customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5)(),
			originalUrl: request.body.originalUrl,
			session: response.locals.session
		});
		response.json(linkSchema(createdLink));
	});

	// Get all links for session
	apiRouter.get('/link', async (request, response) => {
		let foundLinks = await link.find({
			session: response.locals.session
		}).sort({
			createdAt: 'descending'
		});
		response.json(foundLinks.map(linkSchema));
	});

	// Return API router
	return apiRouter;

};
