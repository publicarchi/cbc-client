<script context="module" lang="ts">
	export async function load({ fetch }) {
		let data = await fetch('http://127.0.0.1:8984/cbc/affaires')
			.then((res) => res.json())
			.catch((err) => console.log(err))
		return {
			props: { affaires: data.content, meta: data.meta }
		}
	}
</script>

<script lang="ts">
	import {
		DataTable,
		Grid,
		Row,
		Column,
		Button,
		Loading,
		Link,
		Pagination,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		ToolbarBatchActions
	} from 'carbon-components-svelte'
	import DocumentAdd from 'carbon-icons-svelte/lib/DocumentAdd.svelte'
	import Save from 'carbon-icons-svelte/lib/Save.svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import ExpandedRow from '$components/ExpandedRow.svelte'
	import expandedRowOptions from './_expandedRowOptions'
	import type { IAffaire } from '$lib/types/cbc'

	export let affaires: IAffaire[]
	export let meta

	let searchQuery

	let selectedRowIds = []
	let expandedRowIds = []

	console.log(affaires)

	$: (meta) => {
		fetch('http://127.0.0.1:8984/cbc/affaires')
			.then((res) => res.json())
			.then((data) => {
				meta = data.meta

				// new ids for affairs and deliberation count
				affaires = data.content.map((a) => ({
					...a,
					deliberationCount: a.deliberations.length
				}))
			})
			.catch((err) => console.log(err))
	}

	const onPaginationUpdate = () => null

	const rowOnClick = (row) => {
		if (expandedRowIds.includes(row.detail.id)) {
			expandedRowIds.splice(expandedRowIds.indexOf(row.detail.id), 1)
		} else {
			expandedRowIds.push(row.detail.id)
		}
		//updates expandedRowIds
		expandedRowIds = expandedRowIds
	}
</script>

<svelte:head>
	<title>Affaires</title>
</svelte:head>

<Grid>
	<DataTable
		on:click:row={rowOnClick}
		title="Liste des affaires"
		expandable
		bind:selectedRowIds
		bind:expandedRowIds
		headers={[
			{ key: 'title', value: 'Titre' },
			{ key: 'localisation.commune', value: 'Commune' },
			{ key: 'localisation.departement', value: 'Département' },
			{ key: 'localisation.departementAncien', value: 'Dépt. ancien' },
			{ key: 'localisation.departementDecimal', value: 'Dépt. code' },
			{ key: 'localisation.region', value: 'Région' },
			{ key: 'id', empty: true }
		]}
		rows={affaires}
	>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'id'}
				<Link icon={Launch} href="/affaires/{cell.value}" target="_blank" />
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>

		<svelte:fragment slot="expanded-row" let:row>
			<ExpandedRow data={affaires.find((a) => a.id === row.id)} options={expandedRowOptions} />
		</svelte:fragment>

		<Toolbar>
			<ToolbarBatchActions>
				<Button icon={DocumentAdd}>Créer une affaire</Button>
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

		{#if affaires.length === 0}
			<Loading />
		{/if}
	</DataTable>
</Grid>
