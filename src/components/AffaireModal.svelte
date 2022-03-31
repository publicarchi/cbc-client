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
	} from 'carbon-components-svelte'
	import { Edit16, Launch16 } from 'carbon-icons-svelte'

	import { onMount } from 'svelte'

	import AffaireModalDeliberations from './AffaireModalDeliberations.svelte'
	import type { AffaireType, MetaType } from '$lib/types/affaire'

	export let deliberations
	export let modalOpened

	deliberations[0].affaireId = 'aff100'

	let currentIndex = 0
	let searchValue = ''
	let suggestions = []
	let searchSuggestions = []

	onMount(() => {
		fetch('http://127.0.0.1:8984/cbc/affaires/fromDeliberations', {
			method: 'POST',
			body: JSON.stringify({ body: deliberations.map((d) => d.id) })
		})
			.then((res) => res.json())
			.then((data) => {
				suggestions = data
				console.log('received data', data)
			})
			.catch((err) => console.log(err))
	})

	const initEmptyAffaire = (): AffaireType => {
		return {
			head: '',
			id: '',
			localisation: {
				commune: '',
				departementDecimal: '',
				departement: '',
				departementAncien: '',
				region: ''
			},
			types: '',
			deliberations: deliberations.map((d) => d.id),
			meta: []
		}
	}

	const onClickNext = () => {
		if (!affaire) affaire = initEmptyAffaire()

		currentIndex += 1
		console.log(affaire)
	}
	const onClickPrevious = () => {
		currentIndex = 0
		affaire = initEmptyAffaire()
	}
	const onClickAffId = (id) => {
		affaire = suggestions.concat(searchSuggestions).find((aff) => aff.id === id)
		onClickNext()
	}

	const submitSearch = (e) => {
		if (e.key === 'Enter') {
			console.log(searchValue)

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
			]
		}
	}

	const postAffaire = (e) => {
		console.log('[ + ] Posting new affaire', affaire)
		fetch('http://127.0.0.1:8984/cbc/affaires/create', {
			method: 'POST',
			body: JSON.stringify(affaire)
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err))
	}

	let affaire = initEmptyAffaire()
</script>

<Modal
	open={modalOpened}
	size="lg"
	modalHeading="Créer/Modifier une nouvelle affaire"
	hasForm={true}
	shouldSubmitOnEnter={false}
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
				title="Avant la création d'une nouvelle affaire, merci de vérifier parmi les affaires existantes que celle-ci ne soit pas déjà créée."
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
						{ key: 'id', empty: true },
						{ key: 'overflow', empty: true }
					]}
					rows={searchSuggestions}
				>
					<svelte:fragment slot="cell" let:cell>
						{#if cell.key === 'id'}
							<Link icon={Launch16} href="/deliberations/{cell.value}" target="_blank">
								Accéder
							</Link>
						{:else if cell.key === 'overflow'}
							<Button
								kind="ghost"
								size="small"
								icon={Edit16}
								on:click={() => onClickAffId(cell.value)}>Modifier</Button
							>
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
					{ key: 'head', value: "Nom de l'affaire" },
					{ key: 'localisation.commune', value: 'Commune' },
					{ key: 'meta.dateCreated', value: 'Date de création' },
					{ key: 'meta.creator', value: 'Responsable de la ressource' },
					{ key: 'id', empty: true },
					{ key: 'overflow', empty: true }
				]}
				rows={suggestions}
			>
				<svelte:fragment slot="cell" let:cell>
					{#if cell.key === 'id'}
						<Link icon={Launch16} href="/affaires/{cell.value}" target="_blank">Accéder</Link>
					{:else if cell.key === 'overflow'}
						<Button
							kind="ghost"
							size="small"
							icon={Edit16}
							on:click={() => onClickAffId(cell.value)}>Modifier</Button
						>
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
								<FormLabel>ID de l'affaire</FormLabel>
								<TextInput
									placeholder="Identifiant de l'affaire"
									bind:value={affaire.id}
									disabled
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Nom de l'affaire</FormLabel>
								<TextInput placeholder="Titre de l'affaire" bind:value={affaire.head} />
							</FormItem>
							<br />
							<h4>Localisation de l'affaire</h4>
							<FormItem>
								<FormLabel>Commune</FormLabel>
								<TextInput
									placeholder="Indiquez la commune"
									bind:value={affaire.localisation.commune}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Code du département</FormLabel>
								<TextInput
									placeholder="Indiquez le code du département"
									bind:value={affaire.localisation.departementDecimal}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Département ancien</FormLabel>
								<TextInput
									placeholder="Indiquez le nom de l'ancien département"
									bind:value={affaire.localisation.departementAncien}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Région</FormLabel>
								<TextInput
									placeholder="Indiquez la région"
									bind:value={affaire.localisation.region}
								/>
							</FormItem>
						</Column>
						<Column>
							<br />
							<p style="font-weight: bold;">
								Les délibérations suivantes seront attachées à l'affaire
							</p>
							<AffaireModalDeliberations
								deliberations={deliberations.filter((d) => d.affaireId === '')}
							/>
							<br />
							<p style="font-weight: bold;">
								Les délibérations suivantes ne pourront pas être attachées à l'affaire
							</p>
						</Column>
					</Row>
				</Grid>
			</Form>
		</Content>
	{/if}

	<ButtonSet>
		<Button kind="danger-tertiary">Annuler</Button>
		{#if currentIndex === 0}
			<Button kind="primary" on:click={onClickNext}>Nouvelle affaire</Button>
		{:else if currentIndex === 1}
			<Button kind="tertiary" on:click={onClickPrevious}>Page précédente</Button>
			<Button kind="primary" on:click={postAffaire}>Ajouter une nouvelle affaire</Button>
		{/if}
	</ButtonSet>
</Modal>
