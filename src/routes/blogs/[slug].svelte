<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { slug } = page.params;
		// use a wrapper `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const post = await fetch(`blogs/${slug}.json`);
		const article = await post.json();

		return {
			props: {
				post
			}
		};
	};
</script>

<script>
  // post will have metadata and content
  import {
    Content
  } from 'carbon-components-svelte';
  export let post;
</script>

<svelte:head>
	<title>{post.meta.title}</title>
</svelte:head>

<Content>
  <h1 class="title">{post
.meta.title}</h1>
<!--show the post html with @html-->
  {@html post
.content}
</Content>