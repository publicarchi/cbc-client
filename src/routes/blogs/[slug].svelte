<script context="module">
  export async function load({ page, fetch }) {
    const slug = page.params.slug;
    const post = await fetch(`${slug}.json`)
        .then((r) => r.json());
    return {
      props: { post }
    };
  }
</script>

<script>
  // post will have metadata and content
  export let posts;
  import {
    Content
  } from 'carbon-components-svelte'
</script>

<svelte:head>
	<title>{posts.metadata.title}</title>
</svelte:head>

<Content>
  <h1 class="title">{post.metadata.title}</h1>
<!--show the post html with @html-->
  {@html post.content}
</Content>