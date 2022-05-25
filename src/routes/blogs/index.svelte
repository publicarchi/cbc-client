<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const posts = await fetch('blogs.json')
		const allPosts = await posts.json()

		return {
			props: {
				posts: allPosts
			}
		}
	}
</script>

<script lang="ts">
	export let posts
</script>

<!-- <p class="info">{posts.length} posts.</p> -->
{#each posts as post}
	<a href={post.path}>
		<h2 class="title">{post.meta.title}</h2>
		<p>{post.meta.excerpt}</p>
	</a>
	<p>Publié le {post.meta.date}</p>
{/each}
