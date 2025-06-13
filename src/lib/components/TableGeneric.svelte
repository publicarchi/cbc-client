<script lang="ts">
	import { getContext } from 'svelte';
	import { TableRows, TableCards } from './';

	let { data, config } = $props();

	let {
		view
	}: {
		view: { mode: 'card' | 'row' };
	} = getContext('states');
</script>

{#if view.mode === 'row'}
	<TableRows {data} {config} />
{:else}
	<TableCards {data} />
{/if}
