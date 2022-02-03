<script lang="ts">
	import {
		Modal,
		ProgressIndicator,
		ProgressStep,
		Form,
		Button,
		ButtonSet,
		Content,
		Search,
		DataTable
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';

	onMount(async () => {
		// const res = await fetch('http://127.0.0.1:8984/affaire/suggestions', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(deliberations)
		// });
		// autoSuggestions = await res.json();

		console.log(deliberations);

		autoSuggestions = [
			{
				id: 'aff001',
				title: 'Affaire du couvent de Rouen',
				localisation: { commune: 'Rouen' },
				deliberations: [
					{ title: 'dépôt de mendicité de Rouen', id: 'conbavil00286' },
					{
						title: 'tribunal judiciaire du département ; tribunal de police correctionnelle',
						id: 'conbavil00286'
					}
				],
				meta: {
					dateCreated: '2022/01/22',
					modifiedLast: '2022/02/01',
					creator: 'Emmanuel Chateau-Dutier'
				}
			},
			{
				id: 'aff002',
				title: 'Affaire du palais de justice de Rouen',
				localisation: { commune: 'Rouen' },
				deliberations: [
					{ title: 'dépôt de mendicité de Rouen', id: 'conbavil00286' },
					{
						title: 'tribunal judiciaire du département ; tribunal de police correctionnelle',
						id: 'conbavil00286'
					}
				],
				meta: {
					dateCreated: '2022/01/22',
					modifiedLast: '2022/02/01',
					creator: 'William Diakité'
				}
			}
		];
	});

	export let deliberations;
	export let modalOpened;

	let currentIndex = 0;
	let searchValue = '';
	let autoSuggestions = [];
	let searchSuggestions = [];

	const onClickNext = (e) => (currentIndex += 1);
	const onClickPrevious = (e) => (currentIndex = 0);

	const submitSearch = (e) => {
		if (e.key === 'Enter') {
			console.log(searchValue);
		}
	};
</script>

<Modal
	open={modalOpened}
	size="lg"
	modalHeading="Créer/Modifier une nouvelle affaire"
	hasForm={true}
	passiveModal={true}
	preventCloseOnClickOutside={true}
	iconDescription="Fermer le formulaire"
	on:close={() => (modalOpened = false)}
>
	<ProgressIndicator spaceEqually bind:currentIndex>
		<ProgressStep label="1. Revue des affaires existantes" on:click={() => (currentIndex = 0)} />
		<ProgressStep label="2. Créer/Modifier une affaire" />
	</ProgressIndicator>

	{#if currentIndex === 0}
		<Content>
			<br />
			<Search
				placeholder="Rechercher une affaire par titre"
				bind:value={searchValue}
				on:keydown={submitSearch}
			/>
			<br />

			{#if searchValue !== ''}
				<p>Résultat de la recherche</p>
			{/if}
			<br />

			<p>Suggestion d'affaires existantes</p>
			<br />

			<DataTable
				expandable
				size="short"
				headers={[
					{ key: 'title', value: "Nom de l'affaire" },
					{ key: 'localisation.commune', value: 'Commune' },
					{ key: 'meta.dateCreated', value: 'Date de création' },
					{ key: 'meta.creator', value: 'Responsable de la ressource' }
				]}
				rows={autoSuggestions}
			/>
			<br />

			<p>Délibérations selectionnées</p>
			<br />
		</Content>
	{:else if currentIndex === 1}
		<Content>
			<Form>
				<span>Liste des délibérations</span>
			</Form>
		</Content>
	{/if}

	<ButtonSet>
		<Button kind="danger-tertiary">Annuler</Button>
		{#if currentIndex === 0}
			<Button kind="primary" on:click={onClickNext}>Page suivante</Button>
		{:else if currentIndex === 1}
			<Button kind="tertiary" on:click={onClickPrevious}>Page précédente</Button>
			<Button kind="primary" on:click={onClickNext}>Enregister les modification</Button>
		{/if}
	</ButtonSet>
</Modal>
