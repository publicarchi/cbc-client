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
	import { Header } from '$components/index'

	export let user

	console.log('Hello ', user, 'from layout :o')
	let loginModalOpened = false
</script>

<header>
	<Header {loginModalOpened} {user} />
</header>

<div class="container">
	<slot />
</div>

<footer>
	<p>just a footer</p>
</footer>

<style>
	.container {
		display: grid;
		grid-template-columns: 1.5em 1fr 1fr 1fr 1fr 1.5em;
		grid-template-areas: '. aside content content content .';
		gap: 1.5rem;
		margin-top: 4rem;
	}

	:global(.cbc-aside) {
		grid-area: aside;
	}
	:global(.cbc-content) {
		grid-area: content;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}
</style>
