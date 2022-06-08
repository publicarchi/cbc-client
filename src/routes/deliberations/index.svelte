<script context="module" lang="ts">
	export async function load({ fetch }) {
		const res = await fetch('http://127.0.0.1:8984/cbc/deliberations')
		const data = await res.json()

		return {
			props: {
				meta: data.meta,
				deliberations: data.content
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
	import { user, isAuthenticated, auth } from '$stores'
	import DocumentAdd from 'carbon-icons-svelte/lib/DocumentAdd.svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import Save from 'carbon-icons-svelte/lib/Save.svelte'
	import { ExpandedRow, AffaireModal, ToastNotification, Facets } from '$components'
	import expandedRowOptions from './_expandedRowOptions'
	import type { Deliberation } from '$lib/types/cbc'
	import type { IPaginationMeta } from '$lib/types/requests'

	// export let user
	export let deliberations: Deliberation[]
	export let meta: IPaginationMeta

	let selectedRowIds: string[] = []
	let expandedRowIds: string[] = []
	let selectedDeliberations: Deliberation[] = []
	let affaireModalOpened: boolean = false

	let searchQuery: string = ''
	let facets = []

	let formPosted: boolean = false

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
		// Computes new start index
		meta.start = meta.count * (meta.currentPage - 1)

		// Fetch new data
		fetchData()
	}

	const onClickNewDocument = (e) => {
		if (!$isAuthenticated) {
			$auth.login()
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

	console.log(deliberations)
</script>

<svelte:head>
	<title>Délibérations</title>
</svelte:head>

<div class="cbc-container-grid">
	<div class="cbc-aside">
		<Facets />
		<!-- <DeliberationFacets {types} {categories} /> -->
	</div>
	<div class="cbc-content">
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
				<ExpandedRow
					data={deliberations.find((d) => d.id === row.id)}
					options={expandedRowOptions}
				/>
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

{#if affaireModalOpened}
	<AffaireModal
		deliberations={selectedDeliberations}
		bind:modalOpened={affaireModalOpened}
		bind:formPosted
		bind:selectedRowIds
	/>
{/if}
