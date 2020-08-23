const mongoose = require('mongoose');

/**
 * Connect to Mongo database
 * @param {String} mongoUri Mongo database connection URI
 * @returns {Promise} Mongoose connection instance
 */
module.exports = async (mongoUri) => {
	// Connect to Mongo database
	let connection = await mongoose.connect(mongoUri, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	// Return the connection
	return connection;
};
