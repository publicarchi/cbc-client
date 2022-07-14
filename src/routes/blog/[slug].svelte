<script context="module">
	export async function load(page) {
		console.log('yo')
		return {
			props: {
				post: await import(`../../posts/${page.params.slug}.md`)
			}
		}
	}
</script>

<script lang="ts">
	export let post
	const formatedDate = new Date(post.metadata.date).toLocaleString()
</script>

<svelte:head>
	<title>
		{post.metadata.title}
	</title>
</svelte:head>

<div class="cbc-container">
	<div class="cbc-content">
		<h1>{post.metadata.title}</h1>
		<h3>{formatedDate}</h3>
		<svelte:component this={post.default} />
		<div class="back-btn">
			<a href="/blog">Lire d'autres articles</a>
		</div>
	</div>
</div>

<style>
	h3 {
		margin-bottom: 1.5rem;
		color: grey;
		font-size: medium;
	}

	.back-btn {
		margin-top: 4rem;
		width: 200px;
	}

	.back-btn > a {
		color: black;
		text-decoration: none;
		font-size: medium;
	}

	.back-btn > a:hover {
		color: blue;
	}
</style>
