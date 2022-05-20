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
		Modal
	} from 'carbon-components-svelte'
	import DocumentAdd from 'carbon-icons-svelte/lib/DocumentAdd.svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import Save from 'carbon-icons-svelte/lib/Save.svelte'
	import {
		DeliberationFacets,
		ExpandedRow,
		AffaireModal,
		ToastNotification,
		Facets
	} from '$components/index'
	import expandedRowOptions from './_expandedRowOptions'
	import type { IDeliberation } from '$lib/types/cbc'
	import type { IPaginationMeta } from '$lib/types/requests'

	// export let user
	export let deliberations: IDeliberation[]
	export let meta: IPaginationMeta
	export let types: string[]
	export let categories: string[]

	let selectedRowIds: string[] = []
	let expandedRowIds: string[] = []
	let selectedDeliberations: IDeliberation[] = []

	let userConnected: boolean = true
	let toggleLoginModal: boolean = false
	let affaireModalOpened: boolean = false

	let searchQuery: string = ''
	let filtered: IDeliberation[] = []
	let facets = []

	let formPosted: boolean = false
	$: console.log(formPosted)

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

	// Search deliberations

	const onPaginationUpdate = (e) => {
		let { pageSize, page } = e.detail

		// Computes new start index
		meta.start = meta.count * (meta.currentPage - 1)

		// Fetch new data
		fetchData()
	}

	const onClickNewDocument = (e) => {
		if (!userConnected) {
			toggleLoginModal = true
		} else {
			affaireModalOpened = true
		}
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

	$: selectedDeliberations = deliberations.filter((d) => selectedRowIds.includes(d.id))
</script>

<svelte:head>
	<title>Délibérations</title>
</svelte:head>

{#if formPosted}
	<ToastNotification
		lowContrast
		kind="success"
		title="Modifications prises en compte"
		subtitle="L'affaire a été ajoutée à la base de données."
		caption={new Date().toLocaleString()}
		onClose={() => (formPosted = !formPosted)}
	/>
{/if}

<div class="container">
	<div class="aside">
		<Facets />
		<!-- <DeliberationFacets {types} {categories} /> -->
	</div>

	<div class="content">
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
			rows={deliberations}
		>
			<svelte:fragment slot="cell" let:cell let:row>
				{#if cell.key === 'id'}
					<Link icon={Launch} href="/deliberations/{cell.value}" target="_blank">
						{cell.value}
					</Link>
				{:else if cell.key === 'title'}
					{#if cell.value}
						{cell.value}
					{:else}
						{deliberations.find((d) => d.id === row.id).altTitle}
					{/if}
				{:else}
					{cell.value}
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="expanded-row" let:row>
				<ExpandedRow data={row} options={expandedRowOptions} />
			</svelte:fragment>

			<Toolbar>
				<ToolbarBatchActions>
					<Button icon={DocumentAdd} on:click={onClickNewDocument}>Créer une affaire</Button>
					<Button icon={Save}>Exporter les fiches</Button>
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

					<Button>Rechercher</Button>
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
	</div>
</div>

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
		bind:formPosted
		bind:selectedRowIds
	/>
{/if}

<style>
	.container {
		display: grid;
		grid-template-columns: 1.5em 1fr 1fr 1fr 1fr 1.5em;
		grid-template-areas: '. aside content content content .';
		gap: 1.5rem;
		margin-top: 4rem;
	}

	.aside {
		grid-area: aside;
	}

	.content {
		grid-area: content;
	}
</style>
