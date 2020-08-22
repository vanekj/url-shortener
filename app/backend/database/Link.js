const mongoose = require('mongoose');

const config = require('../config');

const linkSchema = new mongoose.Schema({
	hash: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	originalUrl: {
		type: String,
		required: true
	},
	views: {
		type: Number,
		default: 0
	},
	session: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = config.mongoConnection.model('Link', linkSchema);