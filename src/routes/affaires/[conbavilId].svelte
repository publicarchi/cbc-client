<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		console.log(`http://127.0.0.1:8984/cbc/affaires/${params.conbavilId}`)
		const response = await fetch(`http://127.0.0.1:8984/cbc/affaires/${params.conbavilId}`)
		const affaire = await response.json()

		return { props: { affaire } }
	}
</script>

<script lang="ts">
	import {
		Button,
		Link,
		Modal,
		Form,
		TextInput,
		FormItem,
		FormLabel,
		InlineNotification
	} from 'carbon-components-svelte'

	const submitForm = (e) => {
		affaireForm.deliberations = affaireForm.deliberations.map((d) => d.id)

		affaireForm.meta = {
			user: { id: '1', name: 'William', email: 'will@gmail.com' },
			action: 'modification',
			date: new Date().toISOString()
		}

		fetch('http://127.0.0.1:8984/cbc/affair/update', {
			method: 'POST',
			body: JSON.stringify(affaireForm),
			headers: { 'Content-Type': 'text/plain;charset=utf-8' }
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				modalOpened = false
				updated = true
			})
			.catch((err) => console.log(err))
	}

	export let affaire

	console.log('original data', affaire)

	let affaireForm = { ...affaire }
	let modalOpened = false
	let updated = false
</script>

<svelte:head>
	<title>Affaire</title>
</svelte:head>

<h1>{affaire.head}</h1>

{#if updated}
	<InlineNotification>
		La fiche a bien été mise à jour. Merci de recharger la page pour que les modifications soient
		apparentes.
	</InlineNotification>
{/if}

<h4>Localisation</h4>
<div class="data-group">
	<span class="data-group-label">Commune</span>
	<span class="data-group-value">{affaire.localisation.commune}</span>
</div>
<div class="data-group">
	<span class="data-group-label">Département</span>
	<span class="data-group-value">{affaire.localisation.departement}</span>
</div>
<div class="data-group">
	<span class="data-group-label">Département ancien</span>
	<span class="data-group-value">{affaire.localisation.departementAncien}</span>
</div>
<div class="data-group">
	<span class="data-group-label">Région</span>
	<span class="data-group-value">{affaire.localisation.region}</span>
</div>

<h4>Types de l'affaire</h4>
<span class="data-group-value">{affaire.types}</span>
<ul>
	{#each affaire.types as t}
		<span class="data-group-value">{t}</span>
	{/each}
</ul>

<h4>Délibérations</h4>
<ul>
	{#each affaire.deliberations as d}
		<li>
			<Link href="http://127.0.0.1:3000/deliberations/{d.id}">{d.title ? d.title : d.altTitle}</Link
			>
		</li>
	{/each}
</ul>

<br />
<br />

<Button on:click={() => (modalOpened = true)}>Modifier la fiche</Button>
<Modal
	bind:open={modalOpened}
	on:close={() => (modalOpened = false)}
	on:click:button--primary={submitForm}
	on:click:button--secondary={() => (modalOpened = false)}
	bind:modalHeading={affaire.head}
	size="sm"
	hasForm={true}
	primaryButtonText="Envoyer les modifications"
	shouldSubmitOnEnter={false}
	secondaryButtonText="Annuler"
>
	<Form>
		<FormItem>
			<FormLabel>Titre de l'affaire</FormLabel>
			<TextInput placeholder="Indiquez le titre de l'affaire" bind:value={affaireForm.head} />
		</FormItem>

		<h4>Localisation de l'affaire</h4>
		<FormItem>
			<FormLabel>Commune</FormLabel>
			<TextInput placeholder="Indiquez la commune" bind:value={affaireForm.localisation.commune} />
		</FormItem>
		<FormItem>
			<FormLabel>Département</FormLabel>
			<TextInput
				placeholder="Indiquez le département"
				bind:value={affaireForm.localisation.departement}
			/>
		</FormItem>
		<FormItem>
			<FormLabel>Département (décimal)</FormLabel>
		</FormItem>
		<FormItem>
			<FormLabel>Département ancien</FormLabel>
			<TextInput
				placeholder="Indiquez le département ancien"
				bind:value={affaireForm.localisation.departementAncien}
			/>
		</FormItem>
	</Form>
</Modal>

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
