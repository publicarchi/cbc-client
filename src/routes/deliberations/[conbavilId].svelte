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
		FormLabel
	} from 'carbon-components-svelte';
	import { AddAlt16, ValueVariable16, Delete16 } from 'carbon-icons-svelte';
	import { validateForm } from '$lib/helpers/deliberationFormValidator';
	import { getDeliberationTitle } from '$lib/helpers/deliberationHelpers';
	import { form, formGroups, labelMap } from '$lib/models/form';

	export let deliberation;
	export let types;
	export let categories;

	// Used as copy to display form.
	// Values are binded to form inputs.
	let formData = { ...deliberation };

	// $: console.log(deliberation);
	$: console.log(formData);
	// $: console.log(types);
	// $: console.log(categories);

	let formIsToggled = false;
	let postResponse = { message: '' };
	let postStatus = false;
	let submited = false;

	let invalidStates = {};
	Object.keys(formData).forEach((k) => {
		if (k === 'localisation') {
			Object.keys(formData[k]).forEach((sk) => {
				invalidStates[sk] = false;
			});
		} else if (k === 'types' || k === 'categories') {
			formData[k].forEach((elt, i) => {
				invalidStates[`${k}-${i}`] = false;
			});
		} else {
			invalidStates[k] = false;
		}
	});

	console.log(invalidStates);

	const toggleForm = () => (formIsToggled = !formIsToggled);

	const handleSubmit = async (e) => {
		// todo : custom validation
		// let validated = customValidation(formData)

		console.log(formData);

		if (!checkValidity()) {
			let res = await fetch('http://127.0.0.1:8984/cbc/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			postStatus = res.ok;
			postResponse = await res.json();
			submited = true;
		} else {
			submited = true;
			postStatus = false;
		}
	};

	const checkValidity = () => {
		let hasInvalid = false;
		Object.keys(invalidStates).forEach((id) => {
			console.log('trying to get node with id', id);
			let node = document.getElementById(id);
			if (
				node.validity.typeMismatch ||
				node.validity.valueMissing ||
				node.validity.patternMismatch
			) {
				invalidStates[id] = true;
				hasInvalid = true;
			}
		});

		return hasInvalid;
	};

	const addFormField = (attr) => (formData[attr] = [...formData[attr], '']);

	const removeFormField = (e, attr, index) => {
		formData[attr].splice(index, 1);
		formData = formData;
	};
</script>

<svelte:head>
	<title>Délibération</title>
</svelte:head>

<h1>{getDeliberationTitle(deliberation)}</h1>

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
				<span class="data-group-value">{getDeliberationTitle(deliberation)}</span>
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
		modalHeading={'Modifier la fiche :\n' + getDeliberationTitle(deliberation)}
		primaryButtonText="Enregistrer les modifications"
		secondaryButtonText="Annuler"
		on:click:button--secondary={toggleForm}
		on:close={toggleForm}
		hasForm={true}
		passiveModal={true}
	>
		<Content>
			<Form on:submit={handleSubmit} method="post" novalidate>
				{#each formGroups as g}
					<h4>{g.name}</h4>
					{#each g.keys as k}
						{#if k === 'localisation'}
							{#each g.subkeys as sk}
								<FormItem>
									<FormLabel>{labelMap[sk]}</FormLabel>
									<TextInput
										name={sk}
										id={sk}
										bind:value={formData.localisation[sk]}
										type={form[sk]?.type ? form[sk].type : 'text'}
										pattern={form[sk].pattern}
										disabled={form[sk].disabled}
										invalidText={form[sk].validityMessage}
										bind:invalid={invalidStates[sk]}
									/>
								</FormItem>
							{/each}
						{:else}
							<FormItem>
								<FormLabel>{labelMap[k]}</FormLabel>
								{#if k === 'types' || k === 'categories'}
									{#each formData[k] as _, i}
										<div class="flex-input">
											<TextInput
												name={k}
												id={`${k}-${i}`}
												bind:value={formData[k][i]}
												type={form[k]?.type ? form[k].type : 'text'}
												pattern={form[k].pattern}
												list={`${k}-datalist`}
												disabled={form[k].disabled}
												required={form[k].required}
												invalidText={form[k].validityMessage}
												bind:invalid={invalidStates[`${k}-${i}`]}
											/>
											<Button
												kind="ghost"
												iconDescription="Delete"
												icon={Delete16}
												on:click={(e) => removeFormField(e, k, i)}
											/>
										</div>
									{/each}
									<Button kind="ghost" icon={AddAlt16} on:click={() => addFormField(k)}>
										Ajouter un champs
									</Button>
								{:else}
									<TextInput
										name={k}
										id={k}
										bind:value={formData[k]}
										type={form[k]?.type ? form[k].type : 'text'}
										pattern={form[k].pattern}
										disabled={form[k].disabled}
										required={form[k].required}
										invalidText={form[k].validityMessage}
										title={form[k].validityMessage}
										bind:invalid={invalidStates[k]}
									/>
								{/if}
							</FormItem>
						{/if}
					{/each}
				{/each}

				<ButtonSet>
					<Button kind="secondary">Annuler</Button>
					<Button type="submit">Modifier la fiche</Button>
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
		</Content>

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
	.flex-input {
		display: flex;
	}
</style>
