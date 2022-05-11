<script context="module">
	export function load({ status, error }) {
		return {
			props: { status, error }
		};
	}
</script>

<script>
	import {
		Content,
		InlineNotification
	} from 'carbon-components-svelte';
	import { dev } from '$app/env';
	export let status;
	export let error;
	// we don't want to use <svelte:window bind:online> here, because we only care about the online
	// state when the page first loads
	let online = typeof navigator !== 'undefined' ? navigator.onLine : true;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<Content>
	{#if online}
		<h1>Yikes!</h1>

		{#if error.message}
			<InlineNotification lowContrast kind="error"
 title="Error" subtitle="{status}: {error.message}" />
		{:else}
		<InlineNotification lowContrast kind="error"
 title="Error:" subtitle="Encountered a {status} error" />
		{/if}

		{#if dev && error.stack}
			<pre>{error.stack}</pre>
		{:else}
			{#if status >= 500}
				<p>Please try reloading the page.</p>
			{/if}

			<p>
				If the error persists, please raise an issue on <a href="https://github.com/publicarchi/cbc-client">github</a>. Thanks!
			</p>
		{/if}
	{:else}
		<h1>It looks like you’re offline</h1>

		<p>Reload the page once you’ve found the internet.</p>
	{/if}
</Content>