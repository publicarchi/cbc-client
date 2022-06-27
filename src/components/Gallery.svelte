<script lang="ts">
	import imgList from '$lib/data/image-list.json'

	export let min = 1
	export let max = 9

	// Get random number of image between 1 and 9
	let nbImages = Math.round(Math.random() * max - min) + min

	let images = imgList.sort((a, b) => Math.random()).slice(0, nbImages)
</script>

<div class="gallery">
	{#if nbImages > 0}
		{#each images as img}
			<div class="img-container">
				<a href={img} rel="external" target="_blank">
					<img src={img} alt="" />
				</a>
			</div>
		{/each}
	{:else}
		<div class="center">
			<span>Aucune vue n'est disponible pour cette ressource</span>
		</div>
	{/if}
</div>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.img-container {
		border: solid 1px lightgrey;
	}

	.img-container:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		transition: box-shadow 0.1s ease-in-out;
	}

	.center {
		display: flex;
		height: 60vh;
		width: 100vh;
		align-items: center;
		justify-content: center;
	}

	.center > span {
		color: grey;
	}

	img {
		--size: 12rem;
		width: var(--size);
		height: var(--size);
		object-fit: cover;
	}
</style>
