<script lang="ts">
	import { onMount } from 'svelte'
	import Facet from './Facet.svelte'
	import ChevronDown from 'carbon-icons-svelte/lib/ChevronDown.svelte'
	import Reset from 'carbon-icons-svelte/lib/Reset.svelte'
	import type { IDeliberationFacets } from '$lib/types/facets'

	let facets: IDeliberationFacets = {
		commune: [],
		region: [],
		departement: [],
		departementDecimal: null,
		departementAncien: [],
		projectGenre: [],
		buildingType: [],
		buildingGenre: [],
		administrativeObject: [],
		participant: [],
		date: ''
	}

	let datalists: { [name: string]: string[] } = {
		commune: ['Paris', 'Sartrouville', 'Montesson']
	}

	onMount(async () => {
		const res = await fetch('http://127.0.0.1:8984/cbc/deliberations/facets')
		datalists = await res.json()
		datalists = datalists
	})

	const add = (facet: string, value: string): void => {
		console.log('option clicked with', { facet, value })
		facets[facet].push(value)
	}

	const remove = (facet: string, value: string): void => {
		facets[facet].splice(facets[facet].indexOf(value))
	}

	const reset = (list: string[]): void => {
		console.log('reseting', list)
		list.forEach((f) => {
			facets[f] = []
		})
		facets = facets
	}

	const collapse = (id: string): void => {
		const div = document.getElementById(id)
		div.hidden = !div.hidden
	}
</script>

<div class="container">
	<h4>Facettes</h4>

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
			<div class="btn" on:click={() => collapse('localisation-group')}>
				<ChevronDown />
			</div>
		</div>
	</div>

	<div class="facet-group" id="localisation-group">
		<Facet label="Commune" items={datalists.commune} bind:selected={facets.commune} />
		<Facet label="Département" items={datalists.departement} bind:selected={facets.departement} />
		<Facet
			label="Département ancien"
			items={datalists.departementAncien}
			bind:selected={facets.departementAncien}
		/>
		<Facet label="Région" items={datalists.region} bind:selected={facets.region} />
	</div>

	<div class="separator" />
	<div class="facet-group-header">
		<h5>Édifices et types d'intervention</h5>
		<div class="facet-group-header-btns">
			<div
				class="btn"
				on:click={() => reset(['commune', 'departement', 'departementAncien', 'region'])}
			>
				<Reset />
			</div>
			<div class="btn" on:click={() => collapse('type-group')}>
				<ChevronDown />
			</div>
		</div>
	</div>

	<div class="facet-group" id="type-group">
		<Facet
			label="Genre du projet"
			items={datalists.projectGenre}
			bind:selected={facets.projectGenre}
		/>
		<Facet
			label="Type de bâtiment"
			items={datalists.buildingType}
			bind:selected={facets.buildingType}
		/>
		<Facet
			label="Catégorie du bâtiment"
			items={datalists.buildingGenre}
			bind:selected={facets.buildingGenre}
		/>
		<Facet
			label="Objet administratif"
			items={datalists.administrativeObject}
			bind:selected={facets.administrativeObject}
		/>
	</div>

	<div class="separator" />
	<div class="facet-group-header">
		<h5>Participants</h5>
		<div class="facet-group-header-btns">
			<div
				class="btn"
				on:click={() => reset(['commune', 'departement', 'departementAncien', 'region'])}
			>
				<Reset />
			</div>
			<div class="btn" on:click={() => collapse('participant-group')}>
				<ChevronDown />
			</div>
		</div>
	</div>

	<div class="facet-group" id="participant-group">
		<Facet label="Participants" items={datalists.participant} bind:selected={facets.participant} />
	</div>
</div>

<style>
	h5 {
		font-size: small;
	}

	.facet-group-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.facet-group-header-btns {
		align-self: flex-end;
		display: flex;
		gap: 1.5em;
	}
	.separator {
		border-top: 1px solid #bbb;
		width: 100%;
	}
	.container {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 1em;
		max-width: 100%;
	}
	.btn {
		cursor: pointer;
	}
</style>
