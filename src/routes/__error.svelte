<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<h1>{title}</h1>


<style>
	h2 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		min-height: 400px;
	}
	.errorCode {
		font-size: 8rem;
	}
	.errorMessage {
		font-size: 1rem;
	}
</style>
