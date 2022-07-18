<script context="module" lang="ts">
	import { affairSchema } from '$lib/types/cbcSchemas'
	export async function load({ fetch, params }) {
		const req = `http://127.0.0.1:8984/cbc/affaires/${params.conbavilId}`
		const response = await fetch(req)
		const affaire = await response.json()
		return {
			props: {
				affaire: affairSchema.cast(affaire)
			}
		}
	}
</script>

<script lang="ts">
	import { Button, Link } from 'carbon-components-svelte'
	import { createForm } from 'felte'
	import { validator } from '@felte/validator-yup'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema, warnSchema, type validateSchemaType } from './_validators'
	import { CustomInput, ToastNotification, Gallery, Modal } from '$components'
	import { user, isAuthenticated, auth, notificationState } from '$stores'
	import type { Affair } from '$lib/types/cbc'

	export let affaire: Affair

	let categories: string[] = []
	let types: string[] = []

	let modalOpened = false

	let formSubmited = false
	let toastTitle = ''
	let toastMsg = ''
	let toastKind: 'success' | 'warning' | 'error' | 'info' | 'info-square' | 'warning-alt' =
		'success'

	const modifyDocument = () => {
		if (!$isAuthenticated) $auth.login()
		else {
			modalOpened = true
			formSubmited = false
		}
	}

	const update = async () => {
		const res = await fetch(`http://127.0.0.1:8984/cbc/affaires/${affaire.id}`)
		affaire = await res.json()
	}

	const { form, errors, warnings, isValid } = createForm<validateSchemaType>({
		initialValues: affaire,
		onSubmit: async (values, context) => {
			console.log('Submitting !!')
			console.log(values)

			// Update meta
			values.meta.push({
				who: $user.email,
				type: 'modification',
				when: new Date().toISOString()
			})

			modalOpened = false

			// Post form data
			const res = await fetch('http://127.0.0.1:8984/cbc/affaires/post', {
				method: 'POST',
				body: JSON.stringify({
					type: 'modification',
					affaire: values
				})
			})

			if (res.status === 500) {
				toastTitle = 'Une erreur est survenue'
				toastMsg = 'Suite à une erreur, la modification n a pas eu lieu'
				toastKind = 'error'
				formSubmited = true
				update()
				throw new Error('La modification n a pas eu lieu')
			}
		},
		onSuccess: (response, context) => {
			toastTitle = 'Mise à jour effectuée'
			toastMsg = 'Les modifications ont bien été prises en comptes.'
			toastKind = 'success'
			formSubmited = true
			update()
		},
		onError: (err, context) => {
			// Do something with the error thrown from `onSubmit`.
			console.log('Felte has received an error', err)
		},
		extend: [
			reporter,
			validator({ schema: warnSchema, level: 'warning' }),
			validator({ schema: validateSchema })
		]
	})


	// $: console.log({ $errors, $warnings, $isValid })
</script>

<svelte:head>
	<title>Affaire</title>
</svelte:head>

<ToastNotification title={toastTitle} subtitle={toastMsg} kind={toastKind} show={formSubmited} />

<div class="cbc-container-grid">
	<div class="cbc-aside">
		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Titre</span>
			<span class="cbc-aside-field-value">{affaire.title}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Commune</span>
			<span class="cbc-aside-field-value">{affaire.localisation.commune}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Département</span>
			<span class="cbc-aside-field-value">{affaire.localisation.departement}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Région</span>
			<span class="cbc-aside-field-value">{affaire.localisation.region}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<div class="cbc-aside-field-label">Délibérations</div>
			<ul>
				{#each affaire.deliberations as d}
					<li>
						<Link href="http://127.0.0.1:3000/deliberations/{d.id}"
							>{d.title ? d.title : d.altTitle}</Link
						>
					</li>
				{/each}
			</ul>
		</div>

		<Button kind="ghost" on:click={modifyDocument}>Modifier la fiche</Button>
	</div>

	<div class="cbc-content">
		<Gallery min={0} max={0} />
	</div>
</div>

<Modal
	bind:open={modalOpened}
	on:close={() => (modalOpened = false)}
	on:click:button--secondary={() => (modalOpened = false)}
	bind:modalHeading={affaire.title}
	formId="affair-form"
	primaryButtonText="Soumettre les modifications"
	secondaryButtonText="Annuler"
	primaryButtonDisabled={!$isValid}
	shouldSubmitOnEnter={false}
>
	<form use:form id="affair-form">
		<div class="invisible">
			<input name="id" />
		</div>
		<h4>Identification de l'affaire</h4>
		<CustomInput name="title" label="Titre" />

		<h4>Localisation</h4>
		<CustomInput name="localisation.commune" label="Commune" />
		<CustomInput name="localisation.departement" label="Département" />
		<CustomInput
			type="number"
			name="localisation.departementDecimal"
			label="Département (decimal)"
		/>
		<CustomInput name="localisation.region" label="Région" />

		<h4>Édifice et types d'interventions</h4>
	</form>
</Modal>

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

	.invisible {
		visibility: hidden;
		height: 0;
		width: 0;
		margin: 0;
	}
</style>
