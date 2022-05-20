<script lang="ts">
	import Select from 'svelte-select'

	export let items
	export let label
	export let addFacet
	export let removeFacet
</script>

<div class="group">
	<span>{label}</span>
	<Select isMulti isSearchable bind:items />
</div>

<style>
	.group {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
