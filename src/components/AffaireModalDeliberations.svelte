<script lang="ts">
	import { DataTable, Button, Link } from 'carbon-components-svelte'
	import Launch from 'carbon-icons-svelte/lib/Launch.svelte'
	import RowDelete from 'carbon-icons-svelte/lib/RowDelete.svelte'
	import CheckmarkOutline from 'carbon-icons-svelte/lib/CheckmarkOutline.svelte'
	import MisuseOutline from 'carbon-icons-svelte/lib/MisuseOutline.svelte'
	import type { IDeliberation } from '$lib/types/cbc'

	export let deliberations: IDeliberation[]

	const removeDeliberation = (id) => (deliberations = deliberations.filter((d) => d.id !== id))
</script>

<DataTable
	size="short"
	headers={[
		{ key: 'title', value: 'Délibération' },
		{ key: 'localisation.commune', value: 'Commune' },
		{ key: 'affairId', value: 'Disponibilié' },
		{ key: 'overflow', value: 'Supprimer de la selection' },
		{ key: 'id', empty: true }
	]}
	bind:rows={deliberations}
>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if cell.key === 'id'}
			<Link icon={Launch} href="/deliberations/{cell.value}" target="_blank">
				{cell.value}
			</Link>
		{:else if cell.key === 'title'}
			{#if cell.value}
				{cell.value}
			{:else}
				{deliberations.find((d) => d.id === row.id).altTitle}
			{/if}
		{:else if cell.key === 'overflow'}
			<Button
				kind="danger-ghost"
				icon={RowDelete}
				iconDescription="Retirer de la sélection"
				on:click={() => removeDeliberation(row.id)}
			/>
		{:else if cell.key === 'affairId' && cell.value === ''}
			<CheckmarkOutline aria-label="La ressource n'est attaché à aucune affaire" tabindex="0" />
		{:else if cell.key === 'affairId' && cell.value !== ''}
			<MisuseOutline aria-label={`La ressources est attachée à l'affaire ${cell.value}`} />
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
