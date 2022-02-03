<script lang="ts">
	import Header from '$components/Header.svelte';
	import 'carbon-components-svelte/css/g10.css';
	import { Content } from 'carbon-components-svelte';
</script>

<Header />

<main>
	<Content>
		<slot />
	</Content>
</main>

<footer>
	<p>just a footer</p>
</footer>

<style>
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
</style>
