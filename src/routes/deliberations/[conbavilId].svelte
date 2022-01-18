<script context="module" lang="ts">
	export async function load({ fetch, page }) {
		const id = page.params.conbavilId;

		try {
			const res = await Promise.all([
				fetch(`http://127.0.0.1:8984/cbc/deliberations/${id}`),
				fetch('http://127.0.0.1:8984/cbc/types'),
				fetch('http://127.0.0.1:8984/cbc/categories')
			]);
			const data = await Promise.all(res.map((r) => r.json()));

			return {
				props: {
					deliberation: data[0],
					types: data[1],
					categories: data[2]
				}
			};
		} catch (err) {
			console.log(err);
		}
	}
</script>

<script lang="ts">
	import {
		Button,
		ButtonSet,
		Content,
		Modal,
		Form,
		TextInput,
		InlineNotification,
		FormItem,
		FormLabel,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';
	import { AddAlt16 } from 'carbon-icons-svelte';
	import { validateForm } from '$lib/helpers/deliberationFormValidator';
	import { form, formGroups, labelMap } from '$lib/models/form';

	export let deliberation;
	export let types;
	export let categories;
	$: console.log(deliberation);
	// $: console.log(types);
	// $: console.log(categories);

	let formIsToggled = false;
	let postResponse = { message: '' };
	let postStatus = false;
	let submited = false;
	let invalidStates = {
		id: false,
		title: false,
		date: false,
		item: false,
		pages: false
	};

	const toggleForm = () => (formIsToggled = !formIsToggled);

	const handleSubmit = async (e) => {
		let formData = new FormData(e.target);

		// todo : custom validation
		// let validated = customValidation(formData)

		const data = {};
		for (let field of formData.keys()) {
			const [key, value] = field;
			data[key] = value;
		}

		let res = await fetch('http://127.0.0.1:8984/cbc/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		postStatus = res.ok;
		postResponse = await res.json();
		submited = true;
	};

	const setCustomMessage = (node, message) => {
		if (node.validity.typeMismatch || node.validity.valueMissing || node.validity.patternMismatch) {
			console.log('Validity not ok for ', node.id, node);
			invalidStates[node.id] = true;

			console.log(node);

			// Enlève la notification si la 2e tentative ne passe pas la validation
			submited = false;
		} else {
			invalidStates[node.id] = false;
		}
	};

	const checkValidity = (e) => {
		// This functions sets custom messages for each form input

		let cid = document.getElementById('id');
		let title = document.getElementById('title');
		let date = document.getElementById('date');
		let item = document.getElementById('item');
		let pages = document.getElementById('pages');

		setCustomMessage(cid, 'Un identifiant est requis');
		setCustomMessage(title, 'Un titre est requis');
		setCustomMessage(date, 'La date doit être au format dd/mm/aaaa');
		setCustomMessage(item, 'Ce champ doit comporter un nombre entier supérieur ou égal 0');
		setCustomMessage(pages, 'Ce champ doit comporter un nombre entier supérieur ou égal 0');
	};

	const getDeliberationTitle = () => {
		if (deliberation.title !== '' && deliberation.title !== null) return deliberation.title;
		else {
			let title = 'Delibération du·de ';
			title += deliberation.types.join('/');
			title += ' de ' + deliberation.localisation.commune;
			return title;
		}
	};

	const addFormField = (attr) => {
		// let formGroup = document.getElementById(parentId);
		// let input = document.createElement('TextInput');
		// formGroup.appendChild(input);
		deliberation[attr].push('');
	};
</script>

<svelte:head>
	<title>Délibération</title>
</svelte:head>

<Content>
	<h1>{getDeliberationTitle()}</h1>

	{#each formGroups as g}
		<h4>{g.name}</h4>
		{#each g.keys as k}
			{#if k === 'localisation'}
				{#each g.subkeys as sk}
					<div class="data-group">
						<span class="data-group-label">{labelMap[sk]} :</span>
						<span class="data-group-value">{deliberation[k][sk]}</span>
					</div>
				{/each}
			{:else if k === 'title'}
				<div class="data-group">
					<span class="data-group-label">{labelMap[k]} :</span>
					<span class="data-group-value">{getDeliberationTitle()}</span>
				</div>
			{:else}
				<div class="data-group">
					<span class="data-group-label">{labelMap[k]} :</span>
					<span class="data-group-value">{deliberation[k]}</span>
				</div>
			{/if}
		{/each}
	{/each}

	<br />
	<br />
	<Button on:click={toggleForm}>Modifier la fiche</Button>

	{#if formIsToggled}
		<Modal
			size="lg"
			open
			modalHeading={getDeliberationTitle()}
			primaryButtonText="Enregistrer les modifications"
			secondaryButtonText="Annuler"
			on:click:button--secondary={toggleForm}
			on:close={toggleForm}
			hasForm={true}
			passiveModal={true}
		>
			<Form on:submit={handleSubmit} method="post">
				{#each formGroups as g}
					<h4>{g.name}</h4>
					{#each g.keys as k}
						{#if k === 'localisation'}
							{#each g.subkeys as sk}
								<FormItem>
									<FormLabel>{labelMap[sk]}</FormLabel>
									<TextInput
										name={k}
										value={deliberation.localisation[sk]}
										type={form[sk]?.type ? form[sk].type : 'text'}
									/>
								</FormItem>
							{/each}
						{:else}
							<FormItem>
								<FormLabel>{labelMap[k]}</FormLabel>
								{#if k === 'types' || k === 'categories'}
									{#each deliberation[k] as i}
										<TextInput
											name={k}
											value={i}
											type={form[k]?.type ? form[k].type : 'text'}
											list={`${k}-datalist`}
										/>
									{/each}
									<Button kind="ghost" icon={AddAlt16} on:click={() => addFormField(k)}>
										Ajouter un champs
									</Button>
								{:else}
									<TextInput
										name={k}
										value={deliberation[k]}
										type={form[k]?.type ? form[k].type : 'text'}
									/>
								{/if}
							</FormItem>
						{/if}
					{/each}
				{/each}

				<ButtonSet>
					<Button kind="secondary">Annuler</Button>
					<Button on:click={checkValidity} type="submit">Modifier la fiche</Button>
				</ButtonSet>

				<datalist id="types-datalist">
					{#each types as t}
						<option value={t} />
					{/each}
				</datalist>
				<datalist id="categories-datalist">
					{#each categories as c}
						<option value={c} />
					{/each}
				</datalist>
			</Form>

			{#if submited}
				{#if postStatus}
					<InlineNotification title="Succès" kind="success" subtitle={postResponse.message} />
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

<style>
	h4 {
		margin-top: 1em;
		font-weight: 300;
	}
	.data-group {
		display: flex;
		margin-top: 0.5em;
	}
	.data-group-label {
		font-weight: bold;
	}
	.data-group-value {
		margin-left: 1em;
	}
</style>
