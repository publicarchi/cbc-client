<script lang="ts">
	import { Nav } from '$lib/components';
	import '$lib/style/style.css';
	import { trackDomMutations } from '$lib/utils/debug';

	let { children } = $props();
	/*
 	$effect(() => {
		const observer = trackDomMutations();
		return () => observer.disconnect();
	});
 */
</script>

<header id="header" class="header wrapper">
	<div class="header_inner">
		<a class="header_logo bg" href="index.php" rel="home"
			>Experts et expertises du bâtiment à Paris, 1690-1790</a
		>
		<div class="header_content">
			<Nav />
		</div>
	</div>
</header>
<main id="main" class="main wrapper">
	<article>
		{@render children?.()}
	</article>
</main>
