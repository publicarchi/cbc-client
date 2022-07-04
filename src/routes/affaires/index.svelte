<script context="module" lang="ts">
	export async function load({ fetch }) {
		let data = await fetch('http://127.0.0.1:8984/cbc/affairs')
			.then((res) => res.json())
			.catch((err) => console.log(err))
		return {
			props: {
				affairs: data.content,
				meta: data.meta
			}
		}
	}
</script>

<script lang="ts">
	import {
		DataTable,
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
	import { ExpandedRow } from '$components'
	import expandedRowOptions from './_expandedRowOptions'
	import type { Affair, PaginationType } from '$lib/types/cbc'

	export let affairs: Affair[]
	export let meta: PaginationType

	let searchQuery

	let selectedRowIds = []
	let expandedRowIds = []

	const fetchData = async () => {
		let url = new URL('http://127.0.0.1:8984/cbc/affairs')
		url.searchParams.append('start', meta.start.toString())
		url.searchParams.append('count', meta.count.toString())

		const res = await fetch(url.toString())

		if (res.ok) {
			const data = await res.json()
			affairs = data.content
			meta = {
				...meta,
				start: parseInt(data.meta.start),
				count: parseInt(data.meta.count),
				totalItems: data.meta.totalItems
			}
		}
	}

	const onPaginationUpdate = (e) => {
		meta.start = meta.count * (meta.currentPage - 1)
		if (meta.start === 0) meta.start = 1
		fetchData()
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
</script>

<svelte:head>
	<title>Affaires</title>
</svelte:head>

<div class="cbc-container-grid">
	<div class="cbc-aside" />
	<div class="cbc-content">
		<DataTable
			on:click:row={rowOnClick}
			title="Liste des affaires"
			expandable
			sortable
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
			rows={affairs}
		>
			<svelte:fragment slot="cell" let:cell let:row>
				{#if cell.key === 'id'}
					<Link icon={Launch} href="/affaires/{cell.value}" target="_blank" />
				{:else}
					{cell.value}
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="expanded-row" let:row>
				<ExpandedRow data={affairs.find((a) => a.id === row.id)} options={expandedRowOptions} />
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

			{#if affairs.length === 0}
				<Loading />
			{/if}
		</DataTable>
	</div>
</div>
