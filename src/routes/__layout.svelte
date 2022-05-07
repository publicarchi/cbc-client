<script context="module">
	export async function load({ session }) {
		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script lang="ts">
	import LoginModal from '$components/LoginModal.svelte';
	import 'carbon-components-svelte/css/g10.css';
	import {
		Content,
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		HeaderActionLink
	} from 'carbon-components-svelte';

	export let user;
	console.log('Hello ', user, 'from layout :o');

	let loginModalOpened = false;
</script>

<header>
	<Header aria-label="CBC Project" company="cbc@publicarchi" href="/">
		<HeaderNav>
			<HeaderNavItem href="/seances" text="Séances" />
			<HeaderNavItem href="/deliberations" text="Délibérations" />
			<HeaderNavItem href="/affaires" text="Affaires" />
			<HeaderNavItem href="/blogs" text="Blog" />

			<HeaderNavItem href="/a-propos" text="À propos" />
		</HeaderNav>
		<HeaderUtilities>
			{#if user}
				<HeaderNavItem text={user} />
				<HeaderNavItem text="Deconnexion" href="/oauth/github/logout" rel="external" />
			{:else}
				<HeaderNavItem text="Connexion" on:click={() => (loginModalOpened = true)} />
			{/if}
		</HeaderUtilities>
	</Header>

	<LoginModal bind:open={loginModalOpened} />
</header>

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
