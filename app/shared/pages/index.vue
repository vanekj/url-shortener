<template>
	<div id="app">
		<header class="has-background-light" :class="{ 'is-fullscreen': !links.length }">
			<div class="container">
				<form @submit.prevent="addLink">
					<div class="columns">
						<div class="column">
							<input v-model="url" type="text" class="input is-medium" placeholder="Insert your link" autofocus />
						</div>
						<div class="column is-3">
							<button type="submit" class="button is-primary is-medium is-fullwidth">Shorten</button>
						</div>
					</div>
				</form>
			</div>
		</header>
		<main v-if="links.length" class="pt-5 pb-5">
			<div class="container">
				<div v-for="(link, index) in links" :key="index" class="card">
					<div class="card-content">
						<div class="columns">
							<div class="column">
								<a class="is-size-5 has-text-weight-bold" target="_blank" :href="link.hash">{{ link.hash }}</a>
								<div class="is-size-7">{{ link.originalUrl }}</div>
							</div>
							<div class="column is-2 has-text-right">
								<div>
									{{ link.views }}
									<span class="icon">
										<i class="far fa-eye"></i>
									</span>
								</div>
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
		async asyncData({ $axios }) {
			let links = (await $axios.get('/api/link')).data || [];
			return {
				links
			};
		},
		data() {
			return {
				url: null,
				links: []
			};
		},
		methods: {
			async addLink() {
				if ((this.url || '').trim()) {
					let createdLink = await this.$axios.post('/api/link', {
						originalUrl: this.url
					});
					this.links = [createdLink.data, ...this.links];
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
