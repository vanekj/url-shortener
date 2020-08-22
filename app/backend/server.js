const path = require('path'),
	http = require('http');

const express = require('express'),
	compression = require('compression'),
	cookieParser = require('cookie-parser'),
	{ Nuxt, Builder } = require('nuxt'),
	{ customAlphabet, nanoid } = require('nanoid');

const config = require('./config'),
	nuxtConfig = require('../nuxt.config');

const link = require('./database/Link');

(async () => {
	// Set nuxt config dev
	nuxtConfig.dev = config.isDevelopment;

	// Initiate services
	let app = express(),
		nuxt = new Nuxt(nuxtConfig);

	// If development, run Nuxt builder
	if (nuxtConfig.dev) {
		await new Builder(nuxt).build();
	}

	// Enable gzip compression
	app.use(compression());

	// Enable JSON parser
	app.use(express.json());

	// Enable cookie parser
	app.use(cookieParser());

	// Enable static middleware
	app.use(express.static(path.join(__dirname, '../shared/static')));

	// Attach variables into response locals
	app.use((request, response, next) => {
		response.locals.session = request.cookies.session || nanoid(20);
		response.cookie('session', response.locals.session);
		next();
	});

	// Get link detail
	app.get('/api/link/:hash', async (request, response) => {
		let foundLink = await link.find({
			hash: request.params.hash
		});
		response.json(foundLink);
	});

	// Create shortened link
	app.post('/api/link', async (request, response) => {
		let createdLink = await link.create({
			hash: customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10)(),
			originalUrl: request.body.originalUrl,
			session: response.locals.session
		});
		response.json(createdLink);
	});

	// Get all links for session
	app.get('/api/link', async (request, response) => {
		let foundLinks = await link.find({
			session: response.locals.session
		}).sort({
			createdAt: 'descending'
		});
		response.json(foundLinks);
	});

	// Create redirect on shortened link use
	app.get('/:hash', async (request, response, next) => {
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

	// Use Nuxt middleware
	app.use(nuxt.render);

	// Create HTTP web server
	http.createServer(app).listen(config.port, (error) => {
		if (error) {
			console.log('Error while starting the HTTP server', error);
			process.exit(1);
		} else {
			console.log(`HTTP server running on http://localhost:${config.port}`);
		}
	});
})();
