<script context="module">
	export async function load({ session }) {
		return {
			props: {
				user: session.user
			}
		};
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
	} from 'carbon-components-svelte';
	import { DocumentAdd16, Launch16, Save16 } from 'carbon-icons-svelte';
	import DeliberationFacets from '$components/DeliberationFacets.svelte';
	import DeliberationExpandedRow from '$components/DeliberationExpandedRow.svelte';
	import AffaireModal from '$components/AffaireModal.svelte';
	import { getDeliberationTitle } from '$lib/helpers/deliberationHelpers';
	import { onMount } from 'svelte';

	export let user;
	console.log('Yo', user, 'from deliberation');

	let deliberations = [];
	let meta = { start: 1, count: 20, currentPage: 1, totalItems: 0 };

	let selectedRowIds = [];
	let expandedRowIds = [];
	let selectedDeliberations = [];

	let userConnected = true;
	let toggleLoginModal = false;
	let affaireModalOpened = false;

	let searchQuery = '';
	let filtered = [];
	let facets = [];

	onMount(() => fetchData());

	const fetchData = async () => {
		let url = new URL('http://127.0.0.1:8984/cbc/deliberations');
		Object.keys(meta).forEach((k) => {
			url.searchParams.append(k, meta[k]);
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
			deliberations = data.content;
			meta = {
				...meta,
				start: parseInt(data.meta.start),
				count: parseInt(data.meta.count),
				totalItems: data.meta.totalItems
			};

			console.log('[ + ] received meta', meta);
		}
	};

	const onPaginationUpdate = (e) => {
		let { pageSize, page } = e.detail;

		// Computes new start index
		meta.start = meta.count * (meta.currentPage - 1);

		// Fetch new data
		fetchData();
	};

	const getDeliberationById = (id) => {
		if (deliberations) return deliberations.find((d) => d.id === id);
		return null;
	};

	const onClickNewDocument = (e) => {
		if (!userConnected) {
			toggleLoginModal = true;
		} else {
			affaireModalOpened = true;
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

	const facetsOnChange = (e) => {
		console.log(e.detail.data);
	};

	const rowOnClick = (row) => {
		if (expandedRowIds.includes(row.detail.id)) {
			expandedRowIds.splice(expandedRowIds.indexOf(row.detail.id), 1);
		} else {
			expandedRowIds.push(row.detail.id);
		}
		//updates expandedRowIds
		expandedRowIds = expandedRowIds;
	};

	$: filtered = filterDeliberations(searchQuery, facets, deliberations);

	$: selectedDeliberations = deliberations.filter((d) => selectedRowIds.includes(d.id));
</script>

<svelte:head>
	<title>Délibérations</title>
</svelte:head>

<DeliberationFacets on:change={facetsOnChange} />

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
			<Button icon={DocumentAdd16} on:click={onClickNewDocument}>Créer une affaire</Button>
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

	{#if deliberations.length === 0}
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

{#if affaireModalOpened}
	<AffaireModal deliberations={selectedDeliberations} bind:modalOpened={affaireModalOpened} />
{/if}
