<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<ul>
		<li><a href="/institution">L'institution</a></li>
		<li><a href="/affaires">Les affaires</a></li>
		<li><a href="/acteurs">Les acteurs</a></li>
		<li><a href="/annexes">Annexes</a></li>
		<li><a href="/paramtres">Paramètres</a></li>
	</ul>
</nav>

{@render children?.()}
