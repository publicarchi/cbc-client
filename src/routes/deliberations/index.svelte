<!-- <script context="module" lang="ts">
	// Load function shouldn't be used here : no need to do SSR
	// since the data is fetched every time the view has changed.
	// https://svelte.dev/docs#component-format-script-context-module

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const { id } = page.params;

		let count = 20
		let nbPages = 0
		let currentPage = 1
		const queryParms = { start: 1, count: 20 }

		let url = new URL('http://127.0.0.1:8984/cbc/deliberations')

		for(let k in Object.keys(queryParms)) {
			url.searchParams.append(k, queryParms[k])
		}
		console.log(url)

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				"Content-Type": 'application/json'
			},
		});

		if (res.ok) {
			const data = await res.json()
			const meta = data.meta
			const deliberations = data.content
			return {
				 props: {
					meta,
					deliberations
				  }
			};
		}
		return {
			status: res.status,
			error: new Error()
		};
	}
</script> -->

<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Content,
    	DataTable,
		Pagination,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
  	} from "carbon-components-svelte";

	let deliberations
	let meta = {start: 1, count: 20, totalItems: 0}
	let queryParams = { start: 1, count: 20 }
	let count = 20
	let currentPage = 1

	const fetchData = async (queryParams) => {
		let url = new URL('http://127.0.0.1:8984/cbc/deliberations')
		Object.keys(queryParams).forEach(k => {
			url.searchParams.append(k, queryParams[k])
		})
		console.log(url.toString())

		// This uses the sveltekit's fetch function?
		// Function doesnt allow URL object as parameter -> needs type string
		const res = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				"Content-Type": 'application/json'
			},
		});

		if (res.ok) {
			const data = await res.json()
			console.log(data)
			deliberations = data.content
			meta = data.meta
		}
	}

  	// https://svelte.dev/tutorial/onmount
	//onMount(() => fetchData(queryParams))

	// Updates queryParams everytime view has changed
	$: {
		queryParams.start = count * currentPage
		queryParams.count = count
		console.log('queryParams has changed')
	}

	// fetchData called everytime queryParams has changed
	// !!! Call is made 2 times !!!
	$: fetchData(queryParams)

</script>


<svelte:head>
	<title>Délibération</title>
</svelte:head>

<Content>
	<DataTable
		sortable
		title="Liste des délibérations"
		description="Ensemble des délibérations du Conseil des bâtiments civils."
		headers={[
			{ key: 'title', value: 'Titre' },
			{ key: 'item', value: 'Item' },
			{ key: 'pages', value: 'Pages' },
			{ key: 'commune', value: 'Commune' },
			{ key: 'recommendation', value: 'Recommandation' }
		]}
		rows={
			deliberations
		}
	>
		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch />
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
			backwardText="Previous page"
			forwardText="Next page"
			itemsPerPageText="Items per page:"
			bind:page={currentPage}
			bind:pageSize={count}
			pageSizes={[10, 20, 30, 40, 50]}
			totalItems={meta.totalItems}
		/>

	</DataTable>
</Content>