<script lang="ts">
    import { LoginModal } from '$components/index';
	import 'carbon-components-svelte/css/g10.css';
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
	} from 'carbon-components-svelte';

    export let loginModalOpened:boolean = false
    export let user
</script>


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