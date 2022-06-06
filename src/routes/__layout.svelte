<script lang="ts">
	import 'carbon-components-svelte/css/g10.css'
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		HeaderGlobalAction,
		HeaderPanelLinks,
		HeaderPanelLink,
		HeaderPanelDivider,
		HeaderAction
	} from 'carbon-components-svelte'
	import auth from '$lib/services/auth'
	import { user, isAuthenticated } from '$stores'
	import { onMount } from 'svelte'
	import type { Auth0Client } from '@auth0/auth0-spa-js'

	let authClient: Auth0Client

	onMount(async () => {
		authClient = await auth.createClient()
		isAuthenticated.set(await authClient.isAuthenticated())
		user.set(await authClient.getUser())
	})
</script>

<header>
	<Header aria-label="CBC Project" company="cbc@publicarchi" href="/">
		<HeaderNav>
			<HeaderNavItem href="/seances" text="Séances" />
			<HeaderNavItem href="/deliberations" text="Délibérations" />
			<HeaderNavItem href="/affaires" text="Affaires" />
			<HeaderNavItem href="/blogs" text="Blog" />
		</HeaderNav>
		<HeaderUtilities>
			{#if $isAuthenticated}
				<HeaderAction text={$user.email}>
					<HeaderPanelLinks>
						<HeaderPanelDivider>Compte</HeaderPanelDivider>
						<HeaderPanelLink on:click={() => auth.logout(authClient)}>Déconnexion</HeaderPanelLink>
					</HeaderPanelLinks>
				</HeaderAction>
			{:else}
				<HeaderNavItem text="Connexion" on:click={() => auth.loginWithPopup(authClient, null)} />
			{/if}
			<HeaderNavItem href="/a-propos" text="À propos" />
		</HeaderUtilities>
	</Header>
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
