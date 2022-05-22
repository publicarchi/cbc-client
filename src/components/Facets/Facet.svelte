<script lang="ts">
	import Select from 'svelte-select'
	import Rotate from 'carbon-icons-svelte/lib/Rotate.svelte'
	export let items: string[]
	export let label: string
	export let selected: string[] | null = []
</script>

<div class="group">
	{#if !items}
		<div class="group-label">
			<span>{label}</span>
			<div class="group-label-icon">
				<Rotate />
			</div>
		</div>
	{:else}
		<span>{label}</span>
		<Select isMulti isSearchable placeholder="" {items} bind:justValue={selected} />
	{/if}
</div>

<style>
	.group {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-top: 1em;
	}

	.group-label {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.group-label-icon {
		margin-left: 0.5em;
		animation: rotation 2s linear infinite;
	}
</style>
