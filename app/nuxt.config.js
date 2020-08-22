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
			{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css' },
			{ rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' }
		]
	},
	modules: [
		'@nuxtjs/axios'
	],
	plugins: [
		'@/plugins/axios',
		'@/plugins/filters'
	],
	srcDir: './app/shared'
};
