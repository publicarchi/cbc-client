<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getPrettyRoute } from '$lib/stores/stores.svelte';

	let { title, suptitle }: { title: Snippet; suptitle: Snippet } = $props();

	const prettyRouteItems = getPrettyRoute();
	$inspect(prettyRouteItems);
</script>

<header class="page_header pHeader">
	<ol class="pHeader_bc bc f1-14">
		{#each prettyRouteItems as r}
			<li><a href={r.href}>{r.item}</a></li>
		{/each}
	</ol>
	<div class="pHeader_content">
		<p class="pHeader_sup f1-16 txt-uc">{@render suptitle()}</p>
		<h1 class="pHeader_title f1-80">{@render title()}</h1>
	</div>
	<div class="pHeader_footer">
		<p class="pHeader_goContent">
			<a href="#page-content"
				><svg
					class="icon-big-arrow"
					xmlns="http://www.w3.org/2000/svg"
					width="85"
					height="102"
					viewBox="0 0 85 102"
					fill="none"
				>
					<line vector-effect="non-scaling-stroke" x1="42.5" y1="2.18557e-08" x2="42.5" y2="101" />
					<path vector-effect="non-scaling-stroke" d="M1 59.7485L42.7515 101.5" />
					<path vector-effect="non-scaling-stroke" d="M84 59.7485L42.2485 101.5" /></svg
				><span class="srOnly">Aller au contenu de la page</span></a
			>
		</p>
	</div>
</header>
