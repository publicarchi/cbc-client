<script context="module">
	export async function load({ fetch }) {
		const posts = await fetch('blogs.json')
  	const allPosts = await posts.json()

  	return {
    	props: {
      	posts: allPosts
    	}
  	};
	};
</script>

<script lang="ts">
  import {Content} from "carbon-components-svelte";
	const titre = "Liste des blogs";
	export let posts;
</script>


<!-- <p class="info">{posts.length} posts.</p> -->
{#each posts as post}
  <a href={post.path}>
	  <h2 class="title">{post.meta.title}</h2>
	  <p>{post.meta.excerpt}</p>
  </a>
	<p>Publié le {post.meta.date}</p>
{/each}