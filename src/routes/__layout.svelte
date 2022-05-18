<script context="module">
	export async function load({ session }) {
		return {
			props: {
				user: session.user
			}
		}
	}
</script>

<script lang="ts">
	import { Content } from 'carbon-components-svelte'
	import { Header } from '$components/index'

	export let user

	console.log('Hello ', user, 'from layout :o')
	let loginModalOpened = false
</script>

<header>
	<Header {loginModalOpened} {user} />
</header>

<slot />

<footer>
	<p>just a footer</p>
</footer>

<!-- <style>
	/* @import '../app.scss'; */

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}
</style> -->
