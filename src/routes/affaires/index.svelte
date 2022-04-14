<script context="module" lang="ts">
	export async function load({ fetch }) {
		let response = await fetch('http://127.0.0.1:8984/cbc/affaires')
		let data = await response.json()

		return {
			props: { affaires: data.content, meta: data.meta }
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
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
	import { DocumentAdd16, Save16, Launch16 } from 'carbon-icons-svelte'
	// import AffaireExpandedRow from '$components/AffaireExpandedRow.svelte'

	export let affaires
	export let meta

	let adMap = {}

	let searchQuery

	let selectedRowIds = []
	let expandedRowIds = []

	onMount(async () => {
		adMap = affaires.reduce(async (acc, a) => {
			let deliberations = []
			await Promise.all(
				a.deliberations.map((id) => {
					return fetch(`http://127.0.0.1:8984/cbc/deliberations/${id}`)
						.then((res) => res.json())
						.then((data) => deliberations.push(data))
				})
			)
			acc[a.id] = deliberations
		}, {})

		console.log('adMap', adMap)
	})

	const fetchAffairs = () => {
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

	const getDeliberations = async (ids) => {
		let deliberations = []
		await Promise.all(
			ids.map((id) => {
				return fetch(`http://127.0.0.1:8984/cbc/deliberations/${id}`)
					.then((res) => res.json())
					.then((data) => deliberations.push(data))
					.catch((err) => console.log(err))
			})
		)
	}
</script>

<Grid>
	<DataTable
		on:click:row={rowOnClick}
		title="Liste des affaires"
		bind:selectedRowIds
		bind:expandedRowIds
		headers={[
			{ key: 'head', value: 'Titre' },
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
				<Link icon={Launch16} href="/affaires/{cell.value}" target="_blank" />
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>

		<!-- <svelte:fragment slot="expanded-row" let:row>
			<AffaireExpandedRow
				deliberationIds={affaires.filter((a) => a.id === row.id)[0].deliberations}
			/>
		</svelte:fragment> -->
		<Toolbar>
			<ToolbarBatchActions>
				<Button icon={DocumentAdd16}>Créer une affaire</Button>
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

		{#if affaires.length === 0}
			<Loading />
		{/if}
	</DataTable>
</Grid>
