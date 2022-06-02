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
	import { Button, Modal, TextInput, InlineNotification, Link } from 'carbon-components-svelte'
	import { createForm } from 'felte'
	import { validator } from '@felte/validator-yup'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema, warnSchema, type schemaType } from './_validators'
	import { CustomInput, ToastNotification } from '$components'
	import type { Deliberation } from '$lib/types/cbc'

	export let deliberation: Deliberation

	let formIsToggled = false
	let postResponse = { message: '' }
	let postStatus = false
	let submited = false

	const { form, errors, warnings, isValid } = createForm<schemaType>({
		initialValues: deliberation,
		onSubmit: (values, context) => {
			// fetch('http://127.0.0.1:8984/deliberation/post', {
			// 	method: 'POST',
			// 	body: JSON.stringify(values)
			// })

			console.log('Form has been sumbmited !')
		},
		onSuccess: (response, context) => {
			// Do something with the returned value from `onSubmit`.
			// toggleForm()
			// submited = true
		},
		onError: (err, context) => {
			// Do something with the error thrown from `onSubmit`.
		},
		extend: [
			reporter,
			validator({ schema: validateSchema }),
			validator({ schema: warnSchema, level: 'warning' })
		]
	})
	const toggleForm = () => (formIsToggled = !formIsToggled)

	$: console.log({ $isValid, $warnings, $errors })
</script>

<svelte:head>
	<title>Délibération</title>
</svelte:head>

<div class="cbc-container-grid">
	<div class="cbc-aside">
		<h4>{deliberation.title ? deliberation.title : deliberation.altTitle}</h4>

		<h5>Identification de l'affaire</h5>
		<div class="data-group">
			<span class="data-group-label">Titre</span>
			<span class="data-group-value">{deliberation.title}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Titre (alt.)</span>
			<span class="data-group-value">{deliberation.altTitle}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">ID Séance</span>
			<span class="data-group-value">
				<Link href="#">{deliberation.meetingId}</Link>
			</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Cote</span>
			<span class="data-group-value">{deliberation.cote}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">ID affaire</span>
			<span class="data-group-value">
				<Link href={`http://127.0.0.1:3000/affaires/${deliberation.affairId}`}>
					{deliberation.affairId}
				</Link>
			</span>
		</div>

		<h5>Localisation de l'édifice</h5>
		<div class="data-group">
			<span class="data-group-label">Commune</span>
			<span class="data-group-value">{deliberation.localisation.commune}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Département</span>
			<span class="data-group-value">{deliberation.localisation.departement}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Département (dec.)</span>
			<span class="data-group-value">{deliberation.localisation.departementDecimal}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Région</span>
			<span class="data-group-value">{deliberation.localisation.region}</span>
		</div>

		<h5>Caratéristiques de l'édifice</h5>
		<div class="data-group">
			<span class="data-group-label">Types de l'édifice</span>
			<span class="data-group-value">{deliberation.buildingTypes}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Catégories de l'édifice</span>
			<span class="data-group-value">{deliberation.buildingCategories}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Objet administratif</span>
			<span class="data-group-value">{deliberation.administrativeObjects}</span>
		</div>

		<h5>Délibération</h5>
		<div class="data-group">
			<span class="data-group-label">Recommandation</span>
			<span class="data-group-value">{deliberation.advice}</span>
			<span class="data-group-value">{deliberation.recommandation}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Rapporteur</span>
			<span class="data-group-value">{deliberation.report}</span>
		</div>
		<div class="data-group">
			<span class="data-group-label">Participants</span>
			<span class="data-group-value">{deliberation.participants}</span>
		</div>

		<Button on:click={toggleForm}>Modifier la fiche</Button>
	</div>
</div>

<Modal
	bind:open={formIsToggled}
	size="sm"
	hasForm
	formId="deliberation-form"
	modalHeading={`Modifier la fiche : ${
		deliberation.title ? deliberation.title : deliberation.altTitle
	}`}
	primaryButtonText="Soumettre les modifications"
	secondaryButtonText="Annuler"
	on:click:button--secondary={toggleForm}
	on:close={toggleForm}
>
	<form use:form id="deliberation-form">
		<div class="invisible">
			<TextInput name="id" />
			<TextInput name="affairId" />
			<TextInput name="meetingId" />
			<TextInput name="altTitle" />
			<TextInput name="cote" />
		</div>
		<div class="form-grid">
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
			</div>
			<div class="form-section">
				<h4>Délibération</h4>
				<CustomInput name="advice" label="Avis" />
				<CustomInput type="area" name="recommendation" label="Recommandation" />
			</div>
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
	.form-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		flex-wrap: wrap;
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

	.invisible {
		visibility: hidden;
		height: 0;
		width: 0;
		margin: 0;
	}
</style>
