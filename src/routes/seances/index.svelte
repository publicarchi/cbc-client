<script context="module" lang="ts">
	export async function load({ fetch }) {
		const response = await fetch('http://127.0.0.1:8984/cbc/meetings');		
		const data = await response.json()

		// create temporary ids
		let content = data.content.map((d, i) => {
			d['id'] = i
			return d
		})

		return { 
			props: { meetings: content, meta: data.meta } 
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
	import ExpandedRow from '$components/ExpandedRow.svelte'
	import expandedRowOptions from './_expandedRowOptions'
 
	export let meetings
	export let meta

	let selectedRowIds = []
	let expandedRowIds = []

	const fetchData = async () => {
		let url = new URL('http://127.0.0.1:8984/cbc/meetings')
		Object.keys(meta).forEach((k) => {
			url.searchParams.append(k, meta[k])
		})

		// This uses the sveltekit's fetch function?
		// Function doesnt allow URL object as parameter -> needs type string
		const res = await fetch(url.toString())
		const data = await res.json()
		
		// create temporary ids
		meetings = data.content.map((d, i) => {
			d['id'] = i
			return d
		})

		meta = {
			...meta,
			start: parseInt(data.meta.start),
			count: parseInt(data.meta.count),
			totalItems: data.meta.totalItems
		}
	}

	const onPaginationUpdate = (e) => {
		// Computes new start index
		meta.start = meta.count * (meta.currentPage - 1)

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

<DataTable
	title="Liste des séances"
	bind:selectedRowIds
	bind:expandedRowIds
	on:click:row={rowOnClick}
	expandable
	rows={meetings}
	headers={[
		{ key: 'title', value: 'Titre' },
		{ key: 'date', value: 'Date' },
		{ key: 'cote', value: 'Cote' }
	]}
>
	<svelte:fragment slot="cell" let:cell>
		{#if Array.isArray(cell.value)}
			{cell.value.join(', ')}
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="expanded-row" let:row>
		<ExpandedRow  data={row} options={expandedRowOptions}/>
	</svelte:fragment>

	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch expanded={true} persistent={true} placeholder="rechercher une séance"/>
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
</DataTable>
