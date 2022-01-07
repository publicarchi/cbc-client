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
	import { onDestroy, onMount } from 'svelte';
	import {
		Content,
    	DataTable,
		Pagination,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Link,
		Button,
Loading,
  	} from "carbon-components-svelte";

	import Launch16 from "carbon-icons-svelte/lib/Launch16";

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
		// console.log(url.toString())

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
	// Richard Harris on updating components :
	// https://stackoverflow.com/questions/56891190/how-to-trigger-force-update-a-svelte-component
	//onMount(() => fetchData(queryParams))
	onMount(() => console.log('component onMount()'))
	onDestroy(() => console.log('component onDestroy()'))

	// Updates queryParams everytime view has changed
	$: {
		// todo: check if count is Int
		console.log('queryParams has changed', queryParams)
		queryParams.start = count * (currentPage -1)
		// queryParams.count = count
	}

	// When view changes count changes 2 times...
	$: console.log('count has changed to', count)

	// fetchData called everytime queryParams has changed
	$: fetchData(queryParams)

</script>


<svelte:head>
	<title>Délibérations</title>
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
			{
				key: 'recommendation',
				value: 'Recommandation',
				sort: (a, b) => {
					//todo: trigger an onChangeFilterKey
					console.log('Recommandation est focus !')
					return a.localeCompare(b)
				},
			},
			{ key: 'id', empty: true}
		]}
		rows={
			deliberations
		}
	>
		<svelte:fragment slot="cell" let:cell>
			{#if cell.key === "id"}
			<!-- target='_blank' permet d'ouvrir un nouvel quand on clic sur le lien -->
			<Link
				icon={Launch16}
				href="/deliberations/{cell.value}"
				target="_blank"
			>
				{cell.value}
			</Link>
			{:else}{cell.value}{/if}
		</svelte:fragment>

		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch expanded={true} persistent={true}/>
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
			bind:pageSize={queryParams.count}
			pageSizes={[50, 100, 250, 500]}
			totalItems={meta.totalItems}
		/>

		<!-- {#if !deliberations}
			<Loading />
		{/if} -->

	</DataTable>
</Content>