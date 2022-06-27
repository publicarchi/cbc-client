<script lang="ts">
	import {
		DataTable,
		Button,
		Link,
		Pagination,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem
	} from 'carbon-components-svelte'
	import { ExpandedRow } from '$components'
	import expandedRowOptions from './_expandedRowOptions'

	export let meetings
	export let meta = {
		start: 1,
		count: 20,
		totalItems: 0
	}

	let expandedRowIds = []
	let currentPage = 1

	const fetchData = async () => {
		const res = await fetch('http://127.0.0.1:8984/cbc/meetings', {
			method: 'POST',
			body: JSON.stringify({
				meta
			})
		})
		const data = await res.json()
		meetings = data.meetings
		meta = data.meta
	}

	const onPaginationUpdate = (e) => {
		// Computes new start index
		meta.start = meta.count * (currentPage - 1)

		// Fetch new data
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
	<title>Séances</title>
</svelte:head>

<div class="cbc-container-grid">
	<div class="cbc-aside" />

	<div class="cbc-content">
		<DataTable
			title="Liste des séances"
			bind:expandedRowIds
			on:click:row={rowOnClick}
			expandable
			rows={meetings}
			headers={[
				{ key: 'title', value: 'Titre' },
				{ key: 'date', value: 'Date' },
				{ key: 'cote', value: 'Cote' },
				{ key: 'id', value: 'Identifiant' }
			]}
		>
			<svelte:fragment slot="cell" let:cell>
				{#if Array.isArray(cell.value)}
					{cell.value.join(', ')}
				{:else if cell.key === 'id'}
					<Link href={`/seances/${cell.value}`}>{cell.value}</Link>
				{:else}
					{cell.value}
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="expanded-row" let:row>
				<ExpandedRow data={meetings.find((m) => m.id === row.id)} options={expandedRowOptions} />
			</svelte:fragment>

			<Toolbar>
				<ToolbarContent>
					<ToolbarSearch expanded={true} persistent={true} placeholder="rechercher une séance" />
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
				bind:page={currentPage}
				bind:pageSize={meta.count}
				bind:totalItems={meta.totalItems}
			/>
		</DataTable>
	</div>
</div>
