<script lang="ts">
	import { TableGeneric } from '$lib/components';
	import {
		type ContextType,
		selectedHeadings
	} from '$lib/components/Table.svelte';
	import { get } from '$lib/utils/api';
	import { getContext } from 'svelte';

	let { data } = $props();

	const context = getContext('states') as ContextType;

	context.itemsPerPage.count = Number(data.meta.count) ?? 20;
	context.itemsPerPage.total = Number(data.meta.quantity) ?? 100;
	context.pageCount.total = Math.floor(
		(data.meta.quantity ?? context.itemsPerPage.count) /
			context.itemsPerPage.count
	);

	$effect(() => {
		update();
	});

	const update = async () => {
		const response = await get['deliberations'](
			`?start=${context.itemsPerPage.count * context.pageCount.current + 1}&count=${context.itemsPerPage.count}`
		);
		if (response) data = await response.json();
	};

	// default headers for deliberations
	selectedHeadings.items = [
		{ position: 0, value: 'cote' },
		{ position: 1, value: 'seance' },
		{ position: 2, value: 'title' },
		{ position: 3, value: 'recommendation' }
	];

	// header config
	const headings = {
		meetingId: {
			label: 'meetingId',
			class: 'is-20'
		},
		affairId: {
			label: 'affairId',
			class: 'is-20'
		},
		seance: {
			label: 'Séance',
			class: 'is-15'
		},
		cote: {
			label: 'Cote',
			class: 'is-15'
		},
		id: {
			label: 'Identifiant',
			class: 'is-15'
		},
		title: {
			label: 'Titre',
			class: 'is-20'
		},
		altTitle: {
			label: 'Titre alternatif',
			class: 'is-20'
		},
		item: {
			label: 'Pièce',
			class: 'is-10'
		},
		pages: {
			label: '# pages',
			class: 'is-10'
		},
		localisation: {
			label: 'localisation',
			class: 'is-20'
		},
		buildingTypes: {
			label: 'Édifice',
			class: 'is-20'
		},
		projectGenres: {
			label: 'genres du projet',
			class: 'is-20'
		},
		administrativeObjects: {
			label: 'objets administratifs',
			class: 'is-20'
		},
		report: {
			label: 'rapport',
			class: 'is-25'
		},
		recommendation: {
			label: 'recommandation',
			class: ''
		},
		advice: {
			label: 'avis',
			class: 'is-20'
		}
	};
	const config = { headings };
</script>

<TableGeneric {data} {config} />
