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
		ToolbarBatchActions,
		Link,
		Button,
		ButtonSet,
		Loading,
		Modal,
		Form,
		UnorderedList,
		ListItem
	} from 'carbon-components-svelte';
	import { DocumentAdd16, Launch16, Save16 } from 'carbon-icons-svelte';
	import DeliberationExpandedRow from '$components/DeliberationExpandedRow.svelte';
	import { getDeliberationTitle } from '$lib/helpers/deliberationHelpers';

	let deliberations = [];
	let meta = { start: 1, count: 20, totalItems: 0 };
	let queryParams = { start: 1, count: 20 };
	let count = 20;
	let currentPage = 1;

	let selectedRowIds = [];
	let expandedRowIds = [];

	let userConnected = false;
	let toggleNewDocumentModal = false;
	let toggleLoginModal = false;

	let searchQuery = '';
	let factets = [];
	let filtered = [];

	const fetchData = async (queryParams) => {
		let url = new URL('http://127.0.0.1:8984/cbc/deliberations');
		Object.keys(queryParams).forEach((k) => {
			url.searchParams.append(k, queryParams[k]);
		});
		console.log(url.toString());

		// This uses the sveltekit's fetch function?
		// Function doesnt allow URL object as parameter -> needs type string
		const res = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			const data = await res.json();
			console.log(data);
			deliberations = data.content;
			meta = data.meta;
		}
	};

	const getDeliberationById = (id) => {
		if (deliberations) return deliberations.find((d) => d.id === id);
		return null;
	};

	const onClickModify = (e) => {};

	const onClickNewDocument = (e) => {
		if (!userConnected) {
			toggleLoginModal = true;
		} else {
			toggleNewDocumentModal = true;
		}
	};

	// const containsSearchQuery = (deliberation) => {
	// 	console.log('containsSearchQuery', searchQuery)
	// 	return Object.keys(deliberation).some(k => {
	// 		deliberation[k].toString().includes(searchQuery)})
	// }

	const filterDeliberations = (searchQuery, facets, deliberations) => {
		if (deliberations) {
			let filtered = deliberations;

			// Filter searchQuery
			filtered = filtered.filter((d) => {
				return Object.keys(d).some((k) =>
					d[k].toString().toLowerCase().includes(searchQuery.toLowerCase())
				);
			});

			// Facets

			console.log(filtered);

			return filtered;
		} else {
			return [];
		}
	};

	// https://svelte.dev/tutorial/onmount
	// Richard Harris on updating components :
	// https://stackoverflow.com/questions/56891190/how-to-trigger-force-update-a-svelte-component
	// onMount(() => fetchData(queryParams))
	// onMount(() => console.log('component onMount()'))
	// onDestroy(() => console.log('component onDestroy()'))

	const rowOnClick = (row) => {
		if (expandedRowIds.includes(row.detail.id)) {
			expandedRowIds.splice(expandedRowIds.indexOf(row.detail.id), 1);
		} else {
			expandedRowIds.push(row.detail.id);
		}
		//updates expandedRowIds
		expandedRowIds = expandedRowIds;
	};

	// Updates queryParams everytime view has changed
	$: {
		// todo: check if count is Int
		console.log('queryParams has changed', queryParams);
		queryParams.start = count * (currentPage - 1);
		// queryParams.count = count
	}

	// When view changes count changes 2 times...
	$: console.log('count has changed to', count);

	// fetchData called everytime queryParams has changed
	$: fetchData(queryParams);

	$: filtered = filterDeliberations(searchQuery, factets, deliberations);

	$: console.log('selected', selectedRowIds);
	$: console.log('expanded', expandedRowIds);
</script>

<svelte:head>
	<title>Délibérations</title>
</svelte:head>

<Content>
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
					console.log('Recommandation est focus !');
					return a.localeCompare(b);
				}
			},
			{ key: 'id', empty: true }
		]}
		rows={filtered}
	>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'id'}
				<Link icon={Launch16} href="/deliberations/{cell.value}" target="_blank">
					{cell.value}
				</Link>
			{:else if cell.key === 'title'}
				{getDeliberationTitle(getDeliberationById(row.id))}
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>

		<svelte:fragment slot="expanded-row" let:row>
			<DeliberationExpandedRow deliberation={getDeliberationById(row.id)} />
		</svelte:fragment>

		<Toolbar>
			<ToolbarBatchActions>
				<Button icon={DocumentAdd16} on:click={onClickNewDocument}>Nouvelle fiche</Button>
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
			backwardText="Page précédente"
			forwardText="Page suivante"
			itemsPerPageText="Fiches par page :"
			bind:page={currentPage}
			bind:pageSize={queryParams.count}
			pageSizes={[50, 100, 250, 500]}
			totalItems={meta.totalItems}
		/>

		{#if !deliberations}
			<Loading />
		{/if}
	</DataTable>

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
	{#if toggleNewDocumentModal}
		<Modal
			open
			size="lg"
			modalHeading="Nouvelle fiche"
			primaryButtonText="Créer une nouvelle fiche"
			secondaryButtonText="Annuler"
			hasForm={true}
			passiveModal={true}
		>
			<Form>
				<span>à partir de :</span>
				<UnorderedList>
					{#each selectedRowIds as id}
						<ListItem>
							<Link href="/deliberations/{id}" target="_blank">{id}</Link>
						</ListItem>
					{/each}
				</UnorderedList>
				<ButtonSet>
					<Button kind="secondary">Annuler</Button>
					<Button type="submit">Modifier la fiche</Button>
				</ButtonSet>
			</Form>
		</Modal>
	{/if}
</Content>
