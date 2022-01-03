<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const { id } = page.params;
		const res = await fetch(`http://127.0.0.1:8984/cbc/deliberations`);
		
		if (res.ok) return { 
      props: { 
        deliberations: await res.json() 
      } 
    };
		return {
			status: res.status,
			error: new Error()
		};
	}
</script>

<script lang="ts">
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

	export let deliberations;
	$: console.log(deliberations)
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
	page={1}
	pageNumberText="Page Number"
	pageSize={10}
	pageSizes={[10, 20, 30, 40, 50]}
	totalItems={103}
/>

</DataTable>



  <!-- <h1>Liste des délibérations</h1>
  {#each deliberations as deliberation}
  <div>
	<h2>Délibération {deliberation.id}</h2>
	<ul>
		<li>Titre : {deliberation.title ? deliberation.title : "- –"}</li>
		<li>Date : {deliberation.date ? deliberation.date : "- –"}</li>
		<li>Item : {deliberation.item ? deliberation.item : "- –"}</li>
		<li>Pages : {deliberation.pages ? deliberation.pages : "- –"}</li>
  </ul>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="titre">Titre :</label>
			<input name="title" type="text" bind:value={deliberation.title} />
		</div>
		<div>
			<label for="date">Date :</label>
			<input name="date" type="text" bind:value={deliberation.date} />
		</div>
		<div>
			<label for="item">Item :</label>
			<input name="item" type="text" bind:value={deliberation.item} />
		</div>
		<div>
			<label for="pages">Pages :</label>
			<input name="pages" type="text" bind:value={deliberation.pages} />
		</div>
		<input type="submit" value="submit"/>
</form>
</div>
{/each} -->
</Content>