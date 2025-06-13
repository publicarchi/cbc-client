<script lang="ts">
	import { get } from '$lib/utils/api';
	import { PageHeader, Table } from '$lib/components';

	let { data } = $props();
	let { meta, content } = data;
	const update = async (e: Event) => {
		const select = e.target as HTMLSelectElement;
		const value = select.value;

		get[value as string]()
			.then((res) => res.json())
			.then((d) => (content = d));
	};
</script>

<PageHeader>
	{#snippet suptitle()}
		L'institution
	{/snippet}
	{#snippet title()}
		Base de données Z1J
	{/snippet}
</PageHeader>

<section class="base_txt txt">
	<p>
		Depuis le Moyen Âge et probablement plus tôt, les autorités publiques
		confient à des personnes qu’elles estiment et qualifient compétentes
		l’action d’émettre un avis sur le savoir technique et scientifique, que
		ce soit dans le domaine gracieux comme contentieux. Depuis le Moyen Âge
		et probablement plus tôt, les autorités publiques confient à des
		personnes.
	</p>
	<p><a href="#">En savoir plus sur la base de données</a></p>
</section>

<Table {data} />
