<script lang="ts">
	import Select from 'svelte-select'
	import Rotate from 'carbon-icons-svelte/lib/Rotate.svelte'
	export let items: string[]
	export let label: string
	export let value: string
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
		<Select isMulti isSearchable placeholder="" {items} bind:value />
	{/if}
</div>

<style>
	.group {
		--border: 0px solid red;
		border-bottom: 1px solid grey;

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
		animation: button-loading-spinner 1s ease infinite;
	}

	.group-label-icon {
		transition-property: transform;
		animation-name: svelte-spinner_infinite-spin;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
	@keyframes svelte-spinner_infinite-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-360deg);
		}
	}
</style>
