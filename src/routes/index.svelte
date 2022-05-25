<script lang="ts">
	import { Button } from 'carbon-components-svelte'
</script>

<svelte:head>
	<title>Titre</title>
</svelte:head>

<div class="cbc-container">
	<div class="cbc-content">
		<h1>Bienvenue sur CBC@publicarchi</h1>
		<p>
			Ce site est un un prototype d’application de consultation de la base de données Conbavil. Il
			est conçu à partir d’un export de la base de données <a
				href="https://www.inha.fr/fr/ressources/outils-documentaires/conseil-des-batiments-civils-conbavil.html"
				>Conbavil</a
			>
			en XML, la base de données XML native <a href="https://basex.org/">BaseX</a> avec le language
			<a href="https://www.w3.org/TR/xquery-31/">XQuery</a> et
			<a
				href="http://exquery.github.io/exquery/exquery-restxq-specification/restxq-1.0-specification.html"
				>RESTXQ</a
			>
			,et un client développé en JavaScript avec <a href="https://kit.svelte.dev">SvelteKit</a>.
		</p>

		<p>
			Réalisée par le Centre André Chastel, la base de données Conbavil contient le dépouillement
			analytique de près de 27 000 procès-verbaux du Conseil des bâtiments civils (1795-1840). Ce
			prototype explore d’autres manières de naviguer dans les données rassemblées et des solutions
			pour la restructuration des données et la poursuite du dépouillement pour le reste du siècle.
		</p>

		<Button href="seances">Consulter les séances</Button>
		<Button href="deliberations">Consulter les délibérations</Button>
	</div>
</div>
