<script context="module" lang="ts">
	export async function load({ fetch }) {
		const res = await Promise.all([
			fetch('http://127.0.0.1:8984/cbc/deliberations'),
			fetch('http://127.0.0.1:8984/cbc/types'),
			fetch('http://127.0.0.1:8984/cbc/categories')
		])
		const data = await Promise.all(res.map((r) => r.json()))

		return {
			props: {
				meta: data[0].meta,
				deliberations: data[0].content,
				types: data[1],
				categories: data[2]
			}
		}
	}
</script>

<script lang="ts">
	import {
		DataTable,
		Pagination,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		ToolbarBatchActions,
		Link,
		Button,
		Loading,
		Modal,
		ToastNotification
	} from 'carbon-components-svelte'
	import { DocumentAdd16, Launch16, Save16 } from 'carbon-icons-svelte'
	import DeliberationFacets from '$components/DeliberationFacets.svelte'
	import ExpandedRow from '$components/ExpandedRow.svelte'
	import expandedRowOptions from './_expandedRowOptions'
	import AffaireModal from '$components/AffaireModal.svelte'
	import { getDeliberationTitle } from '$lib/helpers/deliberationHelpers'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	// export let user
	export let deliberations
	export let meta
	export let types
	export let categories

	let selectedRowIds = []
	let expandedRowIds = []
	let selectedDeliberations = []

	let userConnected = true
	let toggleLoginModal = false
	let affaireModalOpened = false

	let searchQuery = ''
	let filtered = []
	let facets = []

	let formPosted = false
	$: console.log(formPosted)

	onMount(() => {
		filtered = filterDeliberations(searchQuery, facets, deliberations)
	})

	const fetchData = async () => {
		let url = new URL('http://127.0.0.1:8984/cbc/deliberations')
		Object.keys(meta).forEach((k) => {
			url.searchParams.append(k, meta[k])
		})

		// This uses the sveltekit's fetch function?
		// Function doesnt allow URL object as parameter -> needs type string
		const res = await fetch(url.toString())

		if (res.ok) {
			const data = await res.json()
			deliberations = data.content
			meta = {
				...meta,
				start: parseInt(data.meta.start),
				count: parseInt(data.meta.count),
				totalItems: data.meta.totalItems
			}
		}
	}

	const onPaginationUpdate = (e) => {
		let { pageSize, page } = e.detail

		// Computes new start index
		meta.start = meta.count * (meta.currentPage - 1)

		// Fetch new data
		fetchData()
	}

	const getDeliberationById = (id) => {
		if (deliberations) return deliberations.find((d) => d.id === id)
		return null
	}

	const onClickNewDocument = (e) => {
		if (!userConnected) {
			toggleLoginModal = true
		} else {
			affaireModalOpened = true
		}
	}

	// const containsSearchQuery = (deliberation) => {
	// 	console.log('containsSearchQuery', searchQuery)
	// 	return Object.keys(deliberation).some(k => {
	// 		deliberation[k].toString().includes(searchQuery)})
	// }

	const filterDeliberations = (searchQuery, facets, deliberations) => {
		if (deliberations) {
			let filtered = deliberations

			// Filter searchQuery
			filtered = filtered.filter((d) => {
				return Object.keys(d).some((k) =>
					d[k].toString().toLowerCase().includes(searchQuery.toLowerCase())
				)
			})

			// Facets
			// console.log(filtered)

			return filtered
		} else {
			return []
		}
	}

	const facetsOnChange = (e) => {
		console.log(e.detail.data)
	}

	const rowOnClick = (row) => {
		if (expandedRowIds.includes(row.detail.id)) {
			expandedRowIds.splice(expandedRowIds.indexOf(row.detail.id), 1)
		} else {
			expandedRowIds.push(row.detail.id)
		}
		//updates expandedRowIds
		expandedRowIds = expandedRowIds
	}

	$: filtered = filterDeliberations(searchQuery, facets, deliberations)

	$: selectedDeliberations = deliberations.filter((d) => selectedRowIds.includes(d.id))
</script>

<svelte:head>
	<title>Délibérations</title>
</svelte:head>

{#if formPosted}
	<div class="toast-container" in:fly={{ x: 100 }}>
		<ToastNotification
				lowContrast
				kind="success"
				title="Modifications prises en compte"
				subtitle="L'affaire a été ajoutée à la base de données."
				caption={new Date().toLocaleString()}
				on:close={() => formPosted = !formPosted}
			/>
	</div>
{/if}

<DeliberationFacets on:change={facetsOnChange} {types} {categories} />

<DataTable
	sortable
	expandable
	selectable={true}
	bind:selectedRowIds
	bind:expandedRowIds
	on:click:row={rowOnClick}
	title="Liste des délibérations"
	description="Ensemble des délibérations du Conseil des bâtiments civils."
	headers={[
		{ key: 'title', value: 'Titre' },
		{ key: 'localisation.commune', value: 'Commune' },
		{
			key: 'recommendation',
			value: 'Recommandation',
			sort: (a, b) => {
				//todo: trigger an onChangeFilterKey
				console.log('Recommandation est focus !')
				return a.localeCompare(b)
			}
		},
		{ key: 'id', empty: true }
	]}
	rows={filtered}
>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if cell.key === 'id'}
			<Link icon={Launch16} href="/deliberations/{cell.value}" target="_blank">
				{cell.value}
			</Link>
		{:else if cell.key === 'title'}
			{getDeliberationTitle(getDeliberationById(row.id))}
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="expanded-row" let:row>
		<ExpandedRow data={row} options={expandedRowOptions} />
	</svelte:fragment>

	<Toolbar>
		<ToolbarBatchActions>
			<Button icon={DocumentAdd16} on:click={onClickNewDocument}>Créer une affaire</Button>
			<Button icon={Save16}>Exporter les fiches</Button>
		</ToolbarBatchActions>
		<ToolbarContent>
			<ToolbarSearch expanded={true} persistent={true} bind:value={searchQuery} />
			<ToolbarMenu>
				<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
				<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service"
					>API documentation</ToolbarMenuItem
				>
				<ToolbarMenuItem danger>Stop all</ToolbarMenuItem>
			</ToolbarMenu>
			<Button>Create balancer</Button>
		</ToolbarContent>
	</Toolbar>

	<Pagination
		on:update={onPaginationUpdate}
		backwardText="Page précédente"
		forwardText="Page suivante"
		itemsPerPageText="Fiches par page :"
		pageSizes={[20, 50, 100, 250, 500]}
		bind:page={meta.currentPage}
		bind:pageSize={meta.count}
		bind:totalItems={meta.totalItems}
	/>

	{#if deliberations.length === 0}
		<Loading />
	{/if}
</DataTable>

{#if toggleLoginModal}
	<Modal
		open
		size="sm"
		modalHeading="Connexion"
		primaryButtonText="Me connecter"
		secondaryButtonText="Annuler"
		on:click:button--primary={() => (userConnected = true)}
	>
		<p>Il est nécessaire de se connecter pour modifier les fiches.</p>
		{#if userConnected}
			<p>Vous êtes connecté(e) !</p>
		{/if}
	</Modal>
{/if}

{#if affaireModalOpened}
	<AffaireModal 
		deliberations={selectedDeliberations} 
		bind:modalOpened={affaireModalOpened} 
		bind:formPosted={formPosted} 
	/>
{/if}



<style>
    .toast-container {
		z-index:1;
        position: absolute;
        margin-left: 50%;
    }
</style>