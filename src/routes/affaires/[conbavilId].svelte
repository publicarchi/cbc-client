<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		const req = `http://127.0.0.1:8984/cbc/affaires/${params.conbavilId}`
		const response = await fetch(req)
		if (!response.ok)
			return {
				status: response.status,
				error: new Error(`Oups, l'affaire n'a pas pu être chargée. ${req}`)
			}

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
		FormLabel
	} from 'carbon-components-svelte'
	import { onMount } from 'svelte'
	import { createForm } from 'felte'
	import * as yup from 'yup'
	import { validator } from '@felte/validator-yup'
	import { validateSchema, warnSchema } from './_formValidators'
	import { ToastNotification } from '$components'
	import type { IAffaire } from '$lib/types/cbc'

	export let affaire: IAffaire

	let categories: string[] = []
	let types: string[] = []

	let affaireForm: IAffaire = { ...affaire }
	let modalOpened = false
	let updated = false

	onMount(async () => {
		[types, categories] = await Promise.all([
			fetch('http://127.0.0.1:8984/cbc/types').then((res) => res.json()),
			fetch('http://127.0.0.1:8984/cbc/categories').then((res) => res.json())
		])
	})

	const { form } = createForm({
		onSubmit(values, context) {
			// Post data with fetch
		},
		onSuccess(response, context) {
			// Do something with the returned value from `onSubmit`.
		},
		onError(err, context) {
			// Do something with the error thrown from `onSubmit`.
		},
		extend: [
			validator({ schema: validateSchema }),
			validator({ schema: warnSchema, level: 'warning' })
		]
	})
</script>

<svelte:head>
	<title>Affaire</title>
</svelte:head>

<div class="cbc-container">
	<div class="cbc-content">
		<h1>{affaire.title}</h1>

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
					<Link href="http://127.0.0.1:3000/deliberations/{d.id}"
						>{d.title ? d.title : d.altTitle}</Link
					>
				</li>
			{/each}
		</ul>

		<br />
		<br />

		<!-- on:click:button--primary -->
		<Button on:click={() => (modalOpened = true)}>Modifier la fiche</Button>
	</div>
</div>

<Modal
	bind:open={modalOpened}
	on:close={() => (modalOpened = false)}
	on:click:button--secondary={() => (modalOpened = false)}
	bind:modalHeading={affaire.title}
	size="sm"
	hasForm={true}
	primaryButtonText="Soumettre les modifications"
	shouldSubmitOnEnter={false}
	secondaryButtonText="Annuler"
>
	<form use:form>
		<h4>Identification de l'affaire</h4>
		<div class="form-item">
			<label class="form-label" for="title">Titre</label>
			<input type="text" name="title" />
		</div>

		<h4>Localisation</h4>
		<div class="form-item">
			<label class="form-label" for="localisation.commune">Commune</label>
			<input type="text" name="localisation.commune" />
		</div>
		<div class="form-item">
			<label class="form-label" for="localisation.departementDecimal">Département (décimal)</label>
			<input type="number" name="localisation.departementDecimal" />
		</div>
		<div class="form-item">
			<label class="form-label" for="localisation.departement">Département</label>
			<input type="text" name="localisation.departement" />
		</div>
		<div class="form-item">
			<label class="form-label" for="localisation.departementAncien">Département ancien</label>
			<input type="text" name="localisation.departementAncien" />
		</div>
		<div class="form-item">
			<label class="form-label" for="localisation.region">Région</label>
			<input type="text" name="localisation.region" />
		</div>

		<h4>Édifice et types d'interventions</h4>
		<div class="for-item">
			<label class="form-label" for="type">Types</label>
			<input list="types" name="type" />
			{#each affaire.types as t}
				<div class="form-item-list">{t}</div>
			{/each}
		</div>
	</form>
</Modal>

{#if updated}
	<ToastNotification
		lowContrast
		kind="success"
		title="Mise à jour effectuée"
		subtitle="Merci de recharger la page pour que les modifications soient apparentes."
		caption={new Date().toLocaleString()}
	/>
{/if}

<datalist id="types">
	{#each types as t}
		<option value={t} />
	{/each}
</datalist>

<datalist id="categories">
	{#each categories as c}
		<option value={c} />
	{/each}
</datalist>

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
