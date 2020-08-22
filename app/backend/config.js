const path = require('path');

const mongoose = require('mongoose');

// Set env variables
const isProduction = process.env.NODE_ENV === 'production',
	isDevelopment = !isProduction;

// Load env variables from .env when on development
if (isDevelopment) {
	require('dotenv').config({ // eslint-disable-line global-require
		path: path.join(__dirname, '../../.env')
	});
}

// Mongo database
const mongoConnection = mongoose.createConnection(process.env.MONGO_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Set config; Init server models
module.exports = {
	isDevelopment,
	isProduction,
	port: process.env.PORT || 80,
	mongoConnection
};
