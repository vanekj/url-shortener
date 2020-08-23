const express = require('express'),
	compression = require('compression'),
	cookieParser = require('cookie-parser'),
	{ nanoid } = require('nanoid');

const config = require('./config'),
	nuxtConfig = require('../nuxt.config');

const connectDatabase = require('./util/connectDatabase'),
	loadDatabaseModels = require('./util/loadDatabaseModels'),
	createApplication = require('./util/createApplication'),
	createNuxtApplication = require('./util/createNuxtApplication'),
	createServer = require('./util/createServer');

const apiRouter = require('./router/api'),
	applicationRouter = require('./router/application');

(async () => {

	// Connect Mongo database
	let database = await connectDatabase(config.mongoUri);

	// Load Mongo database models
	let models = loadDatabaseModels(database);

	// Create Nuxt application
	let nuxt = await createNuxtApplication(nuxtConfig, config);

	// Create Express application with middlewares
	let app = createApplication(config.staticPath);

	// Use compression middleware
	app.use(compression());

	// Use static path middleware
	app.use(express.static(config.staticPath));

	// Use cookie parser middleware
	app.use(cookieParser());

	// Use JSON parser middleware
	app.use(express.json());

	// Store additional response attributes
	app.use((request, response, next) => {
		response.locals.models = models;
		response.locals.session = request.cookies.session || nanoid(20);
		response.cookie('session', response.locals.session, {
			maxAge: 31556952000, // 1 year
			httpOnly: true
		});
		next();
	});

	// Use API router
	app.use('/api', apiRouter());

	// Use application router
	app.use(applicationRouter());

	// Use Nuxt middleware
	app.use(nuxt.render);

	// Create HTTP server
	createServer(app, config.port);

})();
