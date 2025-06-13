<script lang="ts">
	import { page } from '$app/state';
	import { PageHeader, Table } from '$lib/components';
	import '$lib/style/style.css';

	let { children } = $props();
</script>

{#if Object.keys(page.params).length === 0}
	<!-- No id has been provided so it's a table -->
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
			l’action d’émettre un avis sur le savoir technique et scientifique,
			que ce soit dans le domaine gracieux comme contentieux. Depuis le
			Moyen Âge et probablement plus tôt, les autorités publiques confient
			à des personnes.
		</p>
		<p><a href="#">En savoir plus sur la base de données</a></p>
	</section>

	/** Should display table header */

	<Table>
		{@render children()}
	</Table>
{:else}
	<!-- id has been provided so display page without table stuff -->
	{@render children()}
{/if}
