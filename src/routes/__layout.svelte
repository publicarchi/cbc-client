<script lang="ts">
	import 'carbon-components-svelte/css/g10.css'
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		HeaderPanelLinks,
		HeaderPanelLink,
		HeaderPanelDivider,
		HeaderAction
	} from 'carbon-components-svelte'
	import Auth from '$lib/services/auth'
	import { auth, user, isAuthenticated } from '$stores'
	import { onMount } from 'svelte'

	let authClient

	onMount(async () => {
		authClient = await Auth.createClient()

		isAuthenticated.set(await authClient.isAuthenticated())
		user.set(await authClient.getUser())
		auth.set({ login, logout })
	})

	const login = () => Auth.loginWithPopup(authClient, {})
	const logout = () => Auth.logout(authClient)
</script>

<header>
	<Header aria-label="CBC Project" company="cbc@publicarchi" href="/">
		<HeaderNav>
			<HeaderNavItem href="/seances" text="Séances" />
			<HeaderNavItem href="/deliberations" text="Délibérations" />
			<HeaderNavItem href="/affaires" text="Affaires" />
			<HeaderNavItem href="/blog" text="Blog" />
		</HeaderNav>
		<HeaderUtilities>
			{#if $isAuthenticated}
				<HeaderAction text={$user.email}>
					<HeaderPanelLinks>
						<HeaderPanelDivider>Compte</HeaderPanelDivider>
						<HeaderPanelLink on:click={() => logout()}>Déconnexion</HeaderPanelLink>
					</HeaderPanelLinks>
				</HeaderAction>
			{:else}
				<HeaderNavItem text="Connexion" on:click={() => login()} />
			{/if}
			<HeaderNavItem href="/a-propos" text="À propos" />
		</HeaderUtilities>
	</Header>
</header>

<slot />

<footer>
	<p>cbc@publicarchi</p>
</footer>

<style>
	:global(.cbc-container-grid) {
		display: grid;
		grid-template-columns: 1.5em 1fr 3fr 1.5em;
		grid-template-areas: '. aside content  .';
		gap: 1.5em;
		margin-top: 6em;
		min-height: 95vh;
	}

	:global(.cbc-container) {
		display: grid;
		grid-template-columns: 1fr 4fr 1fr;
		grid-template-areas: '. content  .';
		gap: 1.5em;
		margin-top: 6em;
		min-height: 95vh;
	}

	:global(.cbc-aside) {
		grid-area: aside;
	}

	:global(.cbc-content) {
		grid-area: content;
	}

	:global(.cbc-aside-field) {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 1rem;
		/* border-bottom: solid 0.5px lightgray; */
	}

	:global(.cbc-aside-field-label) {
		font-weight: 300;
		font-size: smaller;
		width: 35%;
		text-transform: uppercase;
	}
	:global(.cbc-aside-field-value) {
		width: 65%;
	}

	:global(.cbc-aside-field-value > ul > li) {
		margin-bottom: 0.6em;
	}

	:global(.cbc-separator) {
		border-top: solid 0.5px #bbb;
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	footer {
		height: 20vh;
		background: black;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}
</style>
