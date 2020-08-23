const { Nuxt, Builder } = require('nuxt');

/**
 * Create Nuxt application
 * @param {Object} nuxtConfig Nuxt configuration
 * @param {Object} serverConfig Server configuration
 * @returns {Promise} Resolved when Nuxt is ready
 */
module.exports = async (nuxtConfig, serverConfig) => {
	// Set nuxt into DEV mode (if we are on development)
	nuxtConfig.dev = serverConfig.isDevelopment;
	// Create Nuxt instance
	let nuxt = new Nuxt(nuxtConfig);
	// If we are on development, run Nuxt builder
	if (nuxtConfig.dev) {
		let nuxtBuilder = new Builder(nuxt);
		await nuxtBuilder.build();
	}
	// Return Nuxt instance so we can use it's middleware
	return nuxt;
};
