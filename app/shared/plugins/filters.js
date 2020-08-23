import Vue from 'vue';

Vue.filter('formatDate', (dateString) => {
	let date = new Date(dateString),
		locale = 'en';
	return `${date.toLocaleDateString(locale)}`;
});
