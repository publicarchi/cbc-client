<script lang="ts">
	import { onMount } from 'svelte'
	import Facet from './Facet.svelte'
	import type { IDeliberationFacets } from '$lib/types/facets'

	let facets: IDeliberationFacets = {
		commune: [],
		region: [],
		departement: [],
		departementDecimal: null,
		departementAncien: [],
		projectGenre: [],
		buildingType: [],
		buildingCategory: [],
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

	const addFacet = (facet: string, value: string): void => {
		console.log('option clicked with', { facet, value })
		facets[facet].push(value)
	}

	const removeFacet = (facet: string, value: string): void => {
		facets[facet].splice(facets[facet].indexOf(value))
	}
</script>

<div class="container">
	<h4>Facettes</h4>

	<div class="separator" />
	<h5>Localisation de l'affaire</h5>

	<Facet label="Commune" bind:items={datalists.commune} {addFacet} {removeFacet} />
	<Facet label="Département" bind:items={datalists.departement} {addFacet} {removeFacet} />
	<Facet
		label="Département ancien"
		bind:items={datalists.departementAncien}
		{addFacet}
		{removeFacet}
	/>
	<Facet label="Région" bind:items={datalists.region} {addFacet} {removeFacet} />

	<div class="separator" />
	<h5>Édifices et types d'intervention</h5>

	<Facet label="Genre du projet" bind:items={datalists.projectGenre} {addFacet} {removeFacet} />
	<Facet label="Type de bâtiment" bind:items={datalists.buildingType} {addFacet} {removeFacet} />
	<Facet
		label="Catégorie du bâtiment"
		bind:items={datalists.departementAncien}
		{addFacet}
		{removeFacet}
	/>
	<Facet
		label="Objet administratif"
		bind:items={datalists.administrativeObject}
		{addFacet}
		{removeFacet}
	/>

	<div class="separator" />
	<h5>Participants</h5>

	<Facet label="Participants" bind:items={datalists.participant} {addFacet} {removeFacet} />
</div>

<style>
	h5 {
		font-size: small;
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
</style>
