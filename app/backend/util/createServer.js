const http = require('http');

/**
 * Create Node HTTP server
 * @param {Object} expressApplication Express application to attach
 * @param {Number} serverPort Port on which will the app run
 * @returns {Object} Created HTTP server instance
 */
module.exports = (expressApplication, serverPort) => {
	return http.createServer(expressApplication).listen(serverPort, (error) => {
		if (error) {
			console.log('Error while starting the HTTP server', error);
			process.exit(1);
		} else {
			console.log(`HTTP server running on http://localhost:${serverPort}`);
		}
	});
};
