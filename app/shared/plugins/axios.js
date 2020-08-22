export default function({ $axios }) {
	if (process.client) {
		$axios.defaults.baseURL = window.location.origin;
		console.log($axios.defaults.baseURL);
	}
}
