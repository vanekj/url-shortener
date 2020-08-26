const express = require('express'),
	nanoid = require('nanoid');

const link = require('../model/link'),
	linkSchema = require('../schema/link');

const apiRouter = express.Router();

/**
 * Listen to POST /api/link route and create short version for given URL
 */
apiRouter.post('/link', async (request, response) => {
	let createdLink = await link.create({
		hash: nanoid.customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5)(),
		originalUrl: request.body.originalUrl,
		session: response.locals.session
	});
	response.json(linkSchema(createdLink));
});

/**
 * Listen to GET /api/link route and return all shortened links for current session
 */
apiRouter.get('/link', async (request, response) => {
	let foundLinks = await link.find({
		session: response.locals.session
	}).sort({
		createdAt: 'descending'
	});
	response.json(foundLinks.map(linkSchema));
});

module.exports = apiRouter;
