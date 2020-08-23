/**
 * Schema for Link model
 * @param {Object} link Link Mongo document
 */
module.exports = (link) => ({
	hash: link.hash,
	originalUrl: link.originalUrl,
	views: link.views,
	createdAt: link.createdAt
});
