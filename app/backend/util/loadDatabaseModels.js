const linkFactory = require('../database/Link');

/**
 * Load database models
 * @param {Object} database Mongo database instance
 * @returns {Object} Object with models instances
 */
module.exports = (database) => [
	linkFactory
].reduce((models, factory) => ({
	...models,
	...factory(database)
}), {});
