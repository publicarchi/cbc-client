<script lang="ts">
	import {
		Modal,
		ProgressIndicator,
		ProgressStep,
		Form,
		FormLabel,
		FormItem,
		TextInput,
		Button,
		ButtonSet,
		Content,
		Search,
		DataTable,
		Link,
		Grid,
		Row,
		Column,
		InlineNotification
	} from 'carbon-components-svelte';
	import { Edit16, Launch16 } from 'carbon-icons-svelte';
	import AffaireModalDeliberations from './AffaireModalDeliberations.svelte';
	import { onMount } from 'svelte';

	export let deliberations;
	export let modalOpened;

	deliberations[0].affaireId = 'aff100';

	let currentIndex = 0;
	let searchValue = '';
	let autoSuggestions = [];
	let searchSuggestions = [];
	let affaire = null;

	onMount(async () => {
		// const res = await fetch('http://127.0.0.1:8984/affaire/suggestions', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(deliberations)
		// });
		// autoSuggestions = await res.json();

		console.log('AffaireModal is mounting');
		console.log('selected deliberations:', deliberations);

		autoSuggestions = [
			{
				id: 'aff001',
				title: 'Affaire du couvent de Rouen',
				localisation: { commune: 'Rouen', region: '', departement: '' },
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
				},
				notes: '',
				bibliography: '',
				typology: '',
				adminstratif: ''
			},
			{
				id: 'aff002',
				title: 'Affaire du palais de justice de Rouen',
				localisation: { commune: 'Rouen', region: '', departement: '' },
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
				},
				notes: '',
				bibliography: '',
				typology: '',
				adminstratif: ''
			}
		];

		console.log('AffaireModale mounted');
	});

	const onClickNext = () => {
		if (!affaire) affaire = initAffaire();
		currentIndex += 1;
	};
	const onClickPrevious = () => {
		currentIndex = 0;
		affaire = null;
	};
	const onClickAffId = (id) => {
		affaire = autoSuggestions.concat(searchSuggestions).find((aff) => aff.id === id);
		onClickNext();
	};

	const submitSearch = (e) => {
		if (e.key === 'Enter') {
			console.log(searchValue);

			// const res = await fetch('http://127.0.0.1:8984/affaire/search', {
			// 	method: 'GET',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ searchValue })
			// });

			// const data = await res.json();

			// searchSuggestions = data.affaires;

			searchSuggestions = [
				{
					id: 'aff003',
					title: 'Affaire du couvent de Paris',
					localisation: { commune: 'Paris', region: '', departement: '' },
					deliberations: [
						{ title: 'dépôt de mendicité de Paris', id: 'conbavil00286' },
						{
							title: 'tribunal judiciaire du département ; tribunal de police correctionnelle',
							id: 'conbavil00286'
						}
					],
					meta: {
						dateCreated: '2022/01/22',
						modifiedLast: '2022/02/01',
						creator: 'Emmanuel Chateau-Dutier'
					},
					notes: '',
					bibliography: '',
					typology: '',
					adminstratif: ''
				}
			];
		}
	};

	const initAffaire = () => {
		return {
			title: '',
			dates: '',
			localisation: {
				commune: '',
				region: '',
				departement: ''
			},
			typeAdministratif: '',
			typologie: '',
			notes: '',
			bibliography: ''
		};
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
			<InlineNotification
				kind="info"
				title="Avant la création d'une nouvelle affaire,"
				subtitle="merci de vérifier parmi les affaires existantes que celle-ci ne soit pas déjà créée."
			/>
			<br />
			<Search
				placeholder="Rechercher une affaire par titre. Appuyer sur Entrer pour lancer la recherche."
				bind:value={searchValue}
				on:keydown={submitSearch}
			/>
			<br />

			{#if searchValue !== '' && searchSuggestions.length > 0}
				<p style="font-weight: bold;">Résultat de la recherche</p>
				<DataTable
					expandable
					size="short"
					headers={[
						{ key: 'title', value: "Nom de l'affaire" },
						{ key: 'localisation.commune', value: 'Commune' },
						{ key: 'meta.dateCreated', value: 'Date de création' },
						{ key: 'meta.creator', value: 'Responsable de la ressource' },
						{ key: 'id', empty: true }
					]}
					rows={searchSuggestions}
				>
					<svelte:fragment slot="cell" let:cell>
						{#if cell.key === 'id'}
							<Link icon={Launch16} href="/deliberations/{cell.value}" target="_blank">
								{cell.value}
							</Link>
						{:else}
							{cell.value}
						{/if}
					</svelte:fragment>
				</DataTable>
			{/if}
			<br />

			<p style="font-weight: bold;">Suggestion d'affaires existantes</p>
			<br />

			<DataTable
				expandable
				size="short"
				headers={[
					{ key: 'title', value: "Nom de l'affaire" },
					{ key: 'localisation.commune', value: 'Commune' },
					{ key: 'meta.dateCreated', value: 'Date de création' },
					{ key: 'meta.creator', value: 'Responsable de la ressource' },
					{ key: 'id', empty: true }
				]}
				rows={autoSuggestions}
			>
				<svelte:fragment slot="cell" let:cell>
					{#if cell.key === 'id'}
						<Button
							kind="ghost"
							size="small"
							icon={Edit16}
							on:click={() => onClickAffId(cell.value)}
						>
							{cell.value}
						</Button>
						<!-- {:else if cell.key === 'overflow'}
						<Button kind="danger-ghost" icon={SubtractAlt32} /> -->
					{:else}
						{cell.value}
					{/if}
				</svelte:fragment>
			</DataTable>
			<br />

			<p style="font-weight: bold;">Délibérations selectionnées</p>
			<br />
			<AffaireModalDeliberations bind:deliberations />
		</Content>
	{:else if currentIndex === 1}
		<Content>
			<Form>
				<Grid>
					<Row>
						<Column>
							<h4>Identification de l'affaire</h4>
							<FormItem>
								<FormLabel>Identifiant de l'affaire</FormLabel>
								<TextInput name="id" disabled={true} bind:value={affaire.id} />
							</FormItem>
							<FormItem>
								<FormLabel>Titre de l'affaire</FormLabel>
								<TextInput
									name="title"
									placeholder="Indiquez le nom de l'affaire"
									bind:value={affaire.title}
								/>
							</FormItem>
						</Column>
						<Column>
							<h4>Localisation de l'affaire</h4>

							<FormItem>
								<FormLabel>Commune</FormLabel>
								<TextInput
									name="commune"
									placeholder="Indiquez une commune"
									bind:value={affaire.localisation.commune}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Région</FormLabel>
								<TextInput
									name="region"
									placeholder="Indiquez une région"
									bind:value={affaire.localisation.region}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Département</FormLabel>
								<TextInput
									name="departement"
									placeholder="Indiquez un département"
									bind:value={affaire.localisation.departement}
								/>
							</FormItem>
						</Column>
					</Row>
					<Row>
						<Column>
							<h4>Dates de l'affaire</h4>
							<br />
							<h4>Détails de l'affaire</h4>
							<FormItem>
								<FormLabel>Type administratif</FormLabel>
								<TextInput
									name="administratif"
									placeholder="Indiquez un type administratif"
									bind:value={affaire.administratif}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Typologie</FormLabel>
								<TextInput
									name="typology"
									placeholder="Indiquez une typologie"
									bind:value={affaire.typology}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Notes</FormLabel>
								<TextInput
									name="notes"
									placeholder="Notes concernant l'affaire"
									bind:value={affaire.notes}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Bibliographie</FormLabel>
								<TextInput
									name="bibliography"
									placeholder="Indiquez une bibliographie"
									bind:value={affaire.bibliography}
								/>
							</FormItem>
						</Column>
						<Column>
							<p style="font-weight: bold;">
								Les délibérations suivantes seront attachées à l'affaire
							</p>
							<ul>
								{#each deliberations as d}
									<li>{`${d.title} - ${d.localisation.commune}`}</li>
								{/each}
							</ul>
						</Column>
					</Row>
				</Grid>
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
