<template>
	<div id="app">
		<header class="has-background-light" :class="{ 'is-fullscreen': !linkCount }">
			<div class="container">
				<form @submit.prevent="addLink">
					<div class="columns">
						<div class="column">
							<b-input v-model="url" placeholder="Insert your link" size="is-medium" autofocus />
						</div>
						<div class="column is-3">
							<b-button native-type="submit" size="is-medium" type="is-primary" expanded>Shorten</b-button>
						</div>
					</div>
				</form>
			</div>
		</header>
		<main v-if="linkCount" class="pt-5 pb-5">
			<div class="container">
				<div v-for="(link, index) in links" :key="index" class="card">
					<div class="card-content">
						<div class="columns">
							<div class="column">
								<a class="is-size-5 has-text-weight-bold" target="_blank" :href="link.shortened">{{ link.shortened }}</a>
								<div class="is-size-7">{{ link.original }}</div>
							</div>
							<div class="column is-2 has-text-right">
								<div>{{ link.views }} <b-icon icon="eye" pack="far" /></div>
								<div class="is-size-7">{{ link.createdAt | formatDate }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		filters: {

			/**
			 * Format given Date object
			 * @param {Date} date Instance of Date object
			 * @returns {String} Formatted date string
			 */
			formatDate(date) {
				return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
			}
		},
		data() {
			return {
				url: null,
				links: []
			};
		},
		computed: {
			linkCount() {
				return Array.isArray(this.links) ? this.links.length : 0;
			}
		},
		methods: {
			addLink() {
				if ((this.url || '').trim().length) {
					let shortenedLink = {
						original: this.url,
						shortened: this.url,
						views: Math.round(Math.random() * 1000),
						createdAt: new Date()
					};
					this.links = [shortenedLink, ...this.links];
					this.url = null;
				}
			}
		}
	};
</script>

<style>
	header {
		display: flex;
		align-items: center;
		padding-top: 64px;
		padding-bottom: 64px;
	}

	header.is-fullscreen {
		height: 100vh;
	}
</style>
