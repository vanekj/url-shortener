/* eslint-disable object-property-newline,object-curly-newline */
module.exports = {
	telemetry: false,
	mode: 'universal',
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		titleTemplate: 'URL shortener',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'description', content: 'URL shortener' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' }
		]
	},
	modules: [
		'nuxt-buefy'
	],
	srcDir: './app/shared'
};
