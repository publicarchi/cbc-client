<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		content,
		href
	}: {
		title: Snippet;
		content: Snippet;
		href: string;
	} = $props();
</script>

<li class="navSub_i">
	<a class="navSub_lk" {href}>
		<p class="navSub_t f1-30">{@render title()}</p>
		<p class="navSub_chapo f1-16">
			{@render content()}
		</p>
	</a>
</li>
