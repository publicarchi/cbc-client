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
	import { Button, TextInput, Link, MultiSelect } from 'carbon-components-svelte'
	import { createForm } from 'felte'
	import { validator } from '@felte/validator-yup'
	import { reporter } from '@felte/reporter-svelte'
	import { validateSchema, warnSchema, type schemaType } from './_validators'
	import { CustomInput, ToastNotification, Gallery, Modal } from '$components'
	import { user, isAuthenticated, auth } from '$stores'
	import type { Deliberation } from '$lib/types/cbc'
	import { onMount } from 'svelte'

	export let deliberation: Deliberation
	console.log(deliberation)

	let modalOpened = false
	let formSubmited = false
	let toastTitle = ''
	let toastMsg = ''
	let toastKind: 'success' | 'warning' | 'error' | 'info' | 'info-square' | 'warning-alt' =
		'success'

	type SelectItem = {
		id: number
		text: string
		checked?: boolean
	}

	let datalists: { [k: string]: SelectItem[] } = null
	let selected: { [k: string]: SelectItem[] } = null

	onMount(async () => {
		const res = await fetch('http://127.0.0.1:8984/cbc/facets')
		const data = await res.json()

		datalists = {}
		Object.keys(data).map((k) => {
			datalists[k] = data[k].map((l: string, i: number) => ({ id: i.toString(), text: l }))
		})

		selected = {}
		Object.keys(datalists).forEach((k) => {
			if (!Array.isArray(deliberation[k])) return

			selected[k] = deliberation[k].map((v) => {
				console.log('found something:', v)
				let item = datalists[k].find((elt) => elt.text === v)

				console.log('item added:', item)

				return item
			})
		})
	})

	const modifyDocument = () => {
		if (!$isAuthenticated) $auth.login()
		else modalOpened = true
	}

	const update = async () => {
		const res = await fetch(`http://127.0.0.1:8984/cbc/deliberations/${deliberation.id}`)
		deliberation = await res.json()
	}

	const { form, isValid, errors, warnings } = createForm<schemaType>({
		initialValues: deliberation,
		onSubmit: async (values, context) => {
			// Update meta
			let m = {
				who: $user.email,
				type: 'modification',
				when: new Date().toISOString()
			}
			values.meta ? values.meta.push(m) : (values.meta = [m])

			// Update multiSelect values
			Object.keys(selected).forEach((k) => (values[k] = selected[k].map((e) => e.text)))

			console.log(values)

			modalOpened = false

			const res = await fetch('http://127.0.0.1:8984/cbc/deliberations/post', {
				method: 'POST',
				body: JSON.stringify({
					type: 'modification',
					deliberation: values
				})
			})

			if (res.status === 200) return
			else if (res.status === 500) {
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
			console.log(err)
		},
		extend: [
			reporter,
			validator({ schema: validateSchema }),
			validator({ schema: warnSchema, level: 'warning' })
		]
	})

	// $: console.log('for is valid:', $isValid)
	// $: console.log({
	// 	$isValid,
	// 	$errors,
	// 	$warnings
	// })
	$: console.log(selected)
</script>

<svelte:head>
	<title>Délibération</title>
</svelte:head>

<ToastNotification title={toastTitle} subtitle={toastMsg} kind={toastKind} show={formSubmited} />

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
				<Link href={`/affaires/${deliberation.affairId}`}>
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
			<span class="cbc-aside-field-label">Catégories du projet</span>
			<span class="cbc-aside-field-value">{deliberation.projectGenres}</span>
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
		<div>{JSON.stringify(selected)}</div>
		<Gallery min={0} max={4} />
	</div>
</div>

<Modal
	formId="deliberation-form"
	bind:open={modalOpened}
	modalHeading={`Modifier la fiche : ${
		deliberation.title ? deliberation.title : deliberation.altTitle
	}`}
	on:click:button--secondary={() => (modalOpened = false)}
	on:close={() => (modalOpened = false)}
	primaryButtonText="Soumettre les modifications"
	primaryButtonDisabled={!$isValid}
	secondaryButtonText="Annuler"
	shouldSubmitOnEnter={false}
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
			<h4 class="cbc-form-header">Identification de l'édifice</h4>
			<CustomInput name="title" label="Titre" />
		</div>
		<div class="form-section">
			<h4 class="cbc-form-header">Localisation de l'édifice</h4>
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
			<h4 class="cbc-form-header">Caractéristiques de l'édifice</h4>
			<!-- <CustomInput type="multi" name="buildingTypes" label="Types de l'édifice" /> -->
			{#if datalists && selected}
				<CustomInput
					label="Types de l'édifices"
					type="multi"
					items={datalists ? datalists.buildingTypes : []}
					bind:value={selected.buildingTypes}
				/>
				<CustomInput
					label="Genres du projet"
					type="multi"
					items={datalists ? datalists.projectGenres : []}
					bind:value={selected.projectGenres}
				/>
				<CustomInput
					label="Objets administratifs"
					type="multi"
					items={datalists ? datalists.administrativeObjects : []}
					bind:value={selected.administrativeObjects}
				/>
			{/if}
		</div>
		<div class="form-section">
			<h4 class="cbc-form-header">Délibération</h4>
			<CustomInput name="advice" label="Avis" />
			<CustomInput type="area" name="recommendation" label="Recommandation" />
		</div>
	</form>
</Modal>

<style>
	.invisible {
		visibility: hidden;
		height: 0;
		width: 0;
		margin: 0;
	}
</style>
