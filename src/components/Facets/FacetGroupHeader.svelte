<script lang="ts">
	import ChevronDown from 'carbon-icons-svelte/lib/ChevronDown.svelte'
	import Reset from 'carbon-icons-svelte/lib/Reset.svelte'

	export let collapseId: string

	const collapse = (id: string): void => {
		const div = document.getElementById(id)
		div.hidden = !div.hidden
	}

	const reset = (facets: string[]): void => {}
	
</script>

<div class="separator" />

<div class="facet-group-header">
	<h5>Localisation de l'affaire</h5>
	<div class="facet-group-header-btns">
		<div
			class="btn"
			on:click={() => reset(['commune', 'departement', 'departementAncien', 'region'])}
		>
			<Reset />
		</div>
		<div class="btn" on:click={() => collapse(collapseId)}>
			<ChevronDown />
		</div>
	</div>
</div>
