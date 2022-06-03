<script context="module">
	export async function load({ url }) {
		return {
			props: {
				url
			}
		}
	}
</script>

<script lang="ts">
	import { Header } from '$components'

	export let url

	// This sets the content layout depending on the page
	let route = url.pathname
	let containerClass =
		route === '/' || route === '/blogs' || route === '/a-propos' ? 'container' : 'container-grid'

	// console.log('PATHNAME', url.pathname)
	// console.log('containerClass', containerClass)

	let loginModalOpened = false
	let user = {}
</script>

<header>
	<Header {loginModalOpened} {user} />
</header>

<slot />

<footer>
	<p>just a footer</p>
</footer>

<style>
	:global(.cbc-container-grid) {
		display: grid;
		grid-template-columns: 1.5em 1fr 3fr 1.5em;
		grid-template-areas: '. aside content  .';
		gap: 1.5em;
		margin-top: 6em;
	}

	:global(.cbc-container) {
		display: grid;
		grid-template-columns: 1fr 4fr 1fr;
		grid-template-areas: '. content  .';
		gap: 1.5em;
		margin-top: 6em;
	}

	:global(.cbc-aside) {
		grid-area: aside;
	}
	:global(.cbc-content) {
		grid-area: content;
	}

	:global(.cbc-separator) {
		border-top: 1px solid #bbb;
		width: 100%;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}
</style>
