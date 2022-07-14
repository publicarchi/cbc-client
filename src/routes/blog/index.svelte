<script lang="ts">
	export let posts

	const format = (date) => new Date(date).toLocaleString()
</script>

<div class="cbc-container">
	<div class="cbc-content">
		<div class="container">
			{#each posts as post}
				<div class="card">
					<a href={`/blog/${post.fname}`}>
						<h3 class="title">{post.metadata.title}</h3>
					</a>
					<p class="date">Publié le {format(post.metadata.date)}</p>
					<p class="excerpt">{post.metadata.excerpt}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		max-height: 100%;
		padding: 1.5rem;
		border: solid 0.5px lightgray;
		border-radius: 4px;
		box-shadow: 0 0 3px lightgray;
		gap: 0.3rem;
		overflow: hidden;
	}

	.title {
		margin-bottom: 0.5rem;
	}

	.date {
		color: gray;
		/* margin-top: auto; */
	}
</style>
