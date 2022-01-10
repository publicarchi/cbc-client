<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const id = page.params.conbavilId;
		const res = await fetch(`http://127.0.0.1:8984/cbc/deliberations/${id}`);

		if (res.ok) return {
			props: {
				deliberation: await res.json(),
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
		Button,
		ButtonSet,
		Content,
		Modal,
		Form,
		FormGroup,
		TextInput,
		InlineNotification,
		FormItem,
		FormLabel,
	} from 'carbon-components-svelte'
	import { validateForm } from '$lib/helpers/deliberationFormValidator'
	import { onMount } from 'svelte';


	export let deliberation
	$: console.log(deliberation)

	let formIsToggled = false
	let postResponse = {}
	let postStatus = false
	let submited = false
	let invalidStates = {
		id: false,
		title: false,
		date: false,
		item: false,
		pages: false
	}

	let types = []
	let categories = []

	onMount(() => {
		fetchTypes()
		fetchCategories()
	})

	const fetchTypes = async () => {
		const res = await fetch('http://127.0.0.1:8984/cbc/types')
		types = await res.json()
	}
	const fetchCategories = async () => {
		const res = await fetch('http://127.0.0.1:8984/cbc/categories')
		categories = await res.json()
	}

	const toggleForm = () => formIsToggled = !formIsToggled

	const handleSubmit = async (e) => {
		let formData = new FormData(e.target)

		// todo : custom validation
		// let validated = customValidation(formData)

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		let res = await fetch('http://127.0.0.1:8984/cbc/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		postStatus = res.ok
		postResponse = await res.json()
		submited = true
	}

	const setCustomMessage = (node, message) => {
		if (node.validity.typeMismatch || node.validity.valueMissing || node.validity.patternMismatch) {
			console.log('Validity not ok for ', node.id, node)
			invalidStates[node.id] = true

			console.log(node)

			// Enlève la notification si la 2e tentative ne passe pas la validation
			submited = false
		}
		else {
			invalidStates[node.id] = false
		}
	}

	const checkValidity = (e) => {
		// This functions sets custom messages for each form input

		let cid = document.getElementById('id')
		let title = document.getElementById('title')
		let date = document.getElementById('date')
		let item = document.getElementById('item')
		let pages = document.getElementById('pages')

		setCustomMessage(cid, 'Un identifiant est requis')
		setCustomMessage(title, 'Un titre est requis')
		setCustomMessage(date, 'La date doit être au format dd/mm/aaaa')
		setCustomMessage(item, 'Ce champ doit comporter un nombre entier supérieur ou égal 0')
		setCustomMessage(pages, 'Ce champ doit comporter un nombre entier supérieur ou égal 0')
	}

	// const formGroups = [
	// 	{
	// 		keys: ['id', 'cote', 'seance', 'title'],
	// 		name: "Identification de la fiche"
	// 	},
	// 	{
	// 		keys: ['item', 'pages'],
	// 		name: 'Contenu de la fiche'
	// 	},
	// 	{
	// 		keys: ['localisation'],
	// 		name: 'Localisation'
	// 	},
	// 	{
	// 		keys: ['types', 'categories'],
	// 		name: 'Caractéristiques des batiments concernés'
	// 	},
	// 	{
	// 		keys: ['report', 'recommandation', 'conseil'],
	// 		name: 'Avis et décisions'
	// 	}
	// ]
</script>


<svelte:head>
	<title>Délibération</title>
</svelte:head>

<Content>
	<h1>Délibération {deliberation.id}</h1>
	<ul>
		<li>Titre : {deliberation.title ? deliberation.title : "- –"}</li>
		<li>Date : {deliberation.date ? deliberation.date : "- –"}</li>
		<li>Item : {deliberation.item ? deliberation.item : "- –"}</li>
		<li>Pages : {deliberation.pages ? deliberation.pages : "- –"}</li>
	</ul>

  <Button on:click={toggleForm}>Modifier la fiche</Button>

  	{#if formIsToggled}
	  <Modal
		size="lg"
		open
		modalHeading={deliberation.id}
		primaryButtonText="Enregistrer les modifications"
		secondaryButtonText="Annuler"
		on:click:button--secondary={toggleForm}
		on:close={toggleForm}
		hasForm={true}
		passiveModal={true}
	  >
  		<Form on:submit={handleSubmit} method='post'>
			<FormGroup>
				<FormItem>
					<FormLabel>Identifiant</FormLabel>
					<TextInput
						required
						name="id"
						id='id'
						value={deliberation.id ? deliberation.id : ""}
						bind:warn={invalidStates.id}
						warnText="Un identifiant est requis"
						invalid={false}
						invalidText="test"
					/>
				</FormItem>
				<TextInput
					name="title"
					id="title"
					labelText="Titre"
					value={deliberation.title ? deliberation.title : ""}
					bind:warn={invalidStates.title}
					warnText="Un titre est requis"
				/>
				<TextInput
					name="date"
					id="date"
					labelText="Date"
					type="date"
					value={deliberation.date ? deliberation.date : ""}
					bind:warn={invalidStates.date}
					warnText="La date doit être au format jj/mm/aaaa"
				/>
				<TextInput
					name="item"
					id="item"
					labelText="Item"
					type="number"
					value={deliberation.item ? deliberation.item : ""}
					bind:warn={invalidStates.item}
					warnText="Ce champs doit comporter un nombre entier positif"
					pattern="[0-20]"
				/>
				<TextInput
					name="pages"
					id="pages"
					type="number"
					labelText="Pages"
					value={deliberation.pages ? deliberation.pages : ""}
					bind:warn={invalidStates.pages}
					warnText="Ce champs doit comporter un nombre entier positif"
					pattern="[0-20]"
				/>

				<FormLabel>Types</FormLabel>
				{#each deliberation.types as t}
					<TextInput name="type" value={t} list="types"/>
				{/each}
				<FormLabel>Categories</FormLabel>
				{#each deliberation.categories as c}
					<TextInput name="categorie" value={c} list="categories"/>
				{/each}

				<datalist id="types">
					{#each types as t}
						<option value={t}/>
					{/each}
				</datalist>
				<datalist id="categories">
					{#each categories as c}
						<option value={c}/>
					{/each}
				</datalist>
			</FormGroup>
			<ButtonSet>
				<Button kind="secondary">Annuler</Button>
				<Button on:click={checkValidity} type='submit'>Modifier la fiche</Button>
			</ButtonSet>


		</Form>

		{#if submited}
			{#if postStatus}
				<InlineNotification
					title="Succès"
					kind="success"
					subtitle={postResponse.message}
				/>
			{:else}
				<InlineNotification
					title="Erreur lors de l'envoi du formulaire"
					kind="error"
					subtitle={postResponse.message}
				/>
			{/if}
		{/if}
	</Modal>
  	{/if}

</Content>