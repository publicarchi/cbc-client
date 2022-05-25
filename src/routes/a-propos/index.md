<!-- src/routes/about.svelte -->
<script lang="ts">
  import { Button } from 'carbon-components-svelte'
</script>

<svelte:head>

<title>À propos</title>
</svelte:head>

# À propos

Ce site est un un prototype d’application de consultation de la base de données Conbavil. Il est conçu à partir d’un export de la base de données [Conbavil](https://www.inha.fr/fr/ressources/outils-documentaires/conseil-des-batiments-civils-conbavil.html) en XML, la base de données XML native [BaseX](https://basex.org/) avec le language [XQuery](https://www.w3.org/TR/xquery-31/) et [RESTXQ](http://exquery.github.io/exquery/exquery-restxq-specification/restxq-1.0-specification.html), et un client développé en JavaScript avec [SvelteKit](https://kit.svelte.dev).

Réalisée par le Centre André Chastel, la base de données Conbavil contient le dépouillement analytique de près de 27 000 procès-verbaux du Conseil des bâtiments civils (1795-1840). Ce prototype explore d’autres manières de naviguer dans les données rassemblées et des solutions pour la restructuration des données et la poursuite du dépouillement pour le reste du siècle.

## Développements informatiques

- **Emmanuel Château-Dutier** (Université de Montréal), API BaseX (2022-)
- **William Diakité** (Université de Montréal), Client JavaScript (2022-)
