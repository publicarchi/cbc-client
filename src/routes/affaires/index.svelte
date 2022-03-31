<script lang="ts">
	import { onMount } from 'svelte';
	import { DataTable, Grid, Row, Column } from 'carbon-components-svelte';
	import { v4 as uuidv4 } from 'uuid';

	let affairs = [];
	let meta = null;

	const fetchAffairs = () => {
		fetch('http://127.0.0.1:8984/cbc/affairs')
			.then((res) => res.json())
			.then((data) => {
				meta = data.meta;

				// new ids for affairs and deliberation count
				affairs = data.content.map((a) => ({
					...a,
					id: uuidv4(),
					deliberationCount: a.deliberations.length
				}));
			})
			.catch((err) => console.log(err));
	};

	onMount(() => fetchAffairs());

	$: console.log(affairs);
	$: console.log(meta);
</script>

<Grid>
	<DataTable
		title="Liste des affaires"
		headers={[
			{ key: 'id', value: 'ID' },
			{ key: 'head', value: 'Titre' },
			{ key: 'localisation.commune', value: 'Commune' },
			{ key: 'localisation.departement', value: 'Département' },
			{ key: 'localisation.departementAncien', value: 'Dépt. ancien' },
			{ key: 'localisation.departementDecimal', value: 'Dépt. code' },
			{ key: 'localisation.region', value: 'Région' },
			{ key: 'deliberationCount', value: 'Délibérations' }
		]}
		rows={affairs}
	/>
</Grid>
