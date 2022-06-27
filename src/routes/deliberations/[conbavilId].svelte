<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		const res = await fetch(`http://127.0.0.1:8984/cbc/deliberations/${params.conbavilId}`)
		const deliberation = await res.json()
		return {
			props: { deliberation }
		}
	}
</script>

<script lang="ts">
	import {
		Button,
		Modal,
		TextInput,
		InlineNotification,
		Link,
		Search
	} from 'carbon-components-svelte'
	import { createForm } from 'felte'
	import { validator } from '@felte/validator-yup'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema, warnSchema, type schemaType } from './_validators'
	import { CustomInput, ToastNotification, Gallery } from '$components'
	import Select from 'svelte-select'
	import { user, isAuthenticated, auth } from '$stores'
	import type { Deliberation } from '$lib/types/cbc'
	import { onMount } from 'svelte'

	export let deliberation: Deliberation

	let modalOpened = false
	let postResponse = { message: '' }
	let postStatus = false
	let submited = false
	let datalists

	type SelectType = { value: string; label: string }[]
	let selectedBuildingTypes: SelectType = []
	let selectedProjectGenres: SelectType = []
	let selectedAdministrativeObjects: SelectType = []

	onMount(async () => {
		const res = await fetch('http://127.0.0.1:8984/cbc/facets')
		datalists = await res.json()
		datalists = datalists
	})

	const modifyDocument = () => {
		if (!$isAuthenticated) $auth.login()
		else modalOpened = true
	}

	const { form, errors, warnings, isValid } = createForm<schemaType>({
		initialValues: deliberation,
		onSubmit: (values, context) => {
			let m = {
				who: $user.email,
				type: 'modification',
				when: new Date().toISOString()
			}
			values.meta ? values.meta.push(m) : (values.meta = [m])

			let response
			fetch('http://127.0.0.1:8984/cbc/deliberations/post', {
				method: 'POST',
				body: JSON.stringify({
					type: 'modification',
					deliberation: values
				})
			})
				.then((res) => res.json())
				.then((data) => (response = data))
				.catch((err) => {
					throw new Error(err.message)
				})

			return response
		},
		onSuccess: (response, context) => {
			// toggleForm()
			console.log('form submitted')
			console.log('response', response)
			submited = true
		},
		onError: (err, context) => {
			// Do something with the error thrown from `onSubmit`.
			console.log(err)
		},
		extend: [
			reporter,
			validator({ schema: validateSchema }),
			validator({ schema: warnSchema, level: 'warning' })
		]
	})
	const toggleForm = () => (modalOpened = !modalOpened)

	$: console.log('for is valid:', $isValid)
	$: console.log(datalists)
</script>

<svelte:head>
	<title>Délibération</title>
</svelte:head>

<div class="cbc-container-grid">
	<div class="cbc-aside">
		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Titre</span>
			<span class="cbc-aside-field-value"
				>{deliberation.title ? deliberation.title : deliberation.altTitle}</span
			>
		</div>

		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Cote</span>
			<span class="cbc-aside-field-value">{deliberation.cote}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">ID Séance</span>
			<span class="cbc-aside-field-value">
				<Link href={`/seances/${deliberation.meetingId}`}>{deliberation.meetingId}</Link>
			</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">ID affaire</span>
			<span class="cbc-aside-field-value">
				<Link href={`http://127.0.0.1:3000/affaires/${deliberation.affairId}`}>
					{deliberation.affairId}
				</Link>
			</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Types de l'édifice</span>
			<span class="cbc-aside-field-value">{deliberation.buildingTypes}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Catégories de l'édifice</span>
			<span class="cbc-aside-field-value">{deliberation.buildingCategories}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Objet administratif</span>
			<span class="cbc-aside-field-value">{deliberation.administrativeObjects}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Commune</span>
			<span class="cbc-aside-field-value">{deliberation.localisation.commune}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Département</span>
			<span class="cbc-aside-field-value">{deliberation.localisation.departement}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Département (dec.)</span>
			<span class="cbc-aside-field-value">{deliberation.localisation.departementDecimal}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Région</span>
			<span class="cbc-aside-field-value">{deliberation.localisation.region}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Recommandation</span>
			<span class="cbc-aside-field-value">{deliberation.advice}</span>
			<span class="cbc-aside-field-value">{deliberation.recommandation}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Rapporteur</span>
			<span class="cbc-aside-field-value">{deliberation.report}</span>
		</div>
		<div class="cbc-separator" />

		<Button on:click={modifyDocument}>Modifier la fiche</Button>
	</div>

	<div class="cbc-content">
		<Gallery min={0} max={4} />
	</div>
</div>

<Modal
	bind:open={modalOpened}
	size="sm"
	hasForm
	formId="deliberation-form"
	modalHeading={`Modifier la fiche : ${
		deliberation.title ? deliberation.title : deliberation.altTitle
	}`}
	primaryButtonText="Soumettre les modifications"
	secondaryButtonText="Annuler"
	on:click:button--secondary={() => (modalOpened = false)}
	on:close={() => (modalOpened = false)}
>
	<form use:form id="deliberation-form">
		<div class="invisible">
			<TextInput name="id" />
			<TextInput name="affairId" />
			<TextInput name="meetingId" />
			<TextInput name="altTitle" />
			<TextInput name="cote" />
		</div>

		<div class="form-section">
			<h4>Identification de l'édifice</h4>
			<CustomInput name="title" label="Titre" />
		</div>
		<div class="form-section">
			<h4>Localisation de l'édifice</h4>
			<CustomInput name="localisation.commune" label="Commune" />
			<CustomInput name="localisation.departement" label="Département" />
			<CustomInput
				type="number"
				name="localisation.departementDecimal"
				label="Département (decimal)"
			/>
			<CustomInput name="localisation.region" label="Région" />
		</div>
		<div class="form-section">
			<h4>Caractéristiques de l'édifice</h4>
			<!-- <CustomInput type="multi" name="buildingTypes" label="Types de l'édifice" /> -->
			<CustomInput
				label="Types de l'édifices"
				type="multi"
				listOpen
				items={datalists ? datalists.buildingType : []}
				bind:value={selectedBuildingTypes}
			/>
			<CustomInput
				label="Genres du projet"
				type="multi"
				items={datalists ? datalists.projectGenre : []}
				bind:value={selectedProjectGenres}
			/>
			<CustomInput
				label="Objets administratifs"
				type="multi"
				items={datalists ? datalists.administrativeObject : []}
				bind:value={selectedAdministrativeObjects}
			/>
		</div>
		<div class="form-section">
			<h4>Délibération</h4>
			<CustomInput name="advice" label="Avis" />
			<CustomInput type="area" name="recommendation" label="Recommandation" />
		</div>
	</form>

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

<style>
	h5 {
		font-size: small;
	}

	.invisible {
		visibility: hidden;
		height: 0;
		width: 0;
		margin: 0;
	}
</style>
