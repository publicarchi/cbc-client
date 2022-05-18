<script>
	import {
		SideNav,
		SideNavDivider,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		TextInput,
		Button
	} from 'carbon-components-svelte'
	import RangeSlider from 'svelte-range-slider-pips'
	import Select from 'svelte-select'
	import { createEventDispatcher, onMount } from 'svelte'

	const dispatch = createEventDispatcher()

	export let types
	export let categories

	let facets = {
		commune: null,
		region: null,
		departement: null,
		dates: [1810, 1840],
		types: null,
		categories: null
	}

	let prevFacets = { ...facets }
	let btnDisabled = true

	$: if (JSON.stringify(prevFacets) !== JSON.stringify(facets)) btnDisabled = false

	const dispatchChanges = () => {
		dispatch('change', { data: facets })
		btnDisabled = true
		prevFacets = { ...facets }
	}
</script>

<SideNav isOpen={true} ariaLabel="Filtres">
	<SideNavItems>
		<h4>Facettes</h4>
		<SideNavDivider />

		<SideNavMenu text="Localisation" expanded={true}>
			<SideNavMenuItem text="Commune" />
			<SideNavMenuItem text="Région" />
			<SideNavMenuItem text="Département" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Dates" expanded={true}>
			<RangeSlider
				range
				pushy
				pips
				float
				first="label"
				last="label"
				min={1795}
				max={1840}
				step={1}
				pipstep={20}
				all="rest"
				bind:values={facets.dates}
			/>
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Caractéristiques de l'affaire" expanded={true}>
			<Select items={types} placeholder="Types de bâtiment" />
			<Select items={categories} placeholder="Type d'intervention" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Personnes impliquées" expanded={true}>
			<TextInput name="Rapporteur" placeholder="Rapporteur" />
		</SideNavMenu>

		<SideNavDivider />
		<Button on:click={dispatchChanges} bind:disabled={btnDisabled}>Actualiser la recherche</Button>
	</SideNavItems>
</SideNav>
