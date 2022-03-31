<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		const id = params.conbavilId
		let affaire

		console.log('Affaire ID', id)

		fetch(`http://127.0.0.1:8984/cbc/affairs/${id}`)
			.then((res) => res.json())
			.then((data) => (affaire = data.content))
			.catch((err) => console.log(err))

		return { props: { affaire } }
	}
</script>

<script lang="ts">
	export let affaire
</script>

<svelte:head>
	<title>Affaire</title>
</svelte:head>

<h1>{affaire.head}</h1>
