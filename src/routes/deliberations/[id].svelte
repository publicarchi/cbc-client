
<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const { id } = page.params;
		const res = await fetch(`http://127.0.0.1:8984/cbc/deliberations/${id}`);
		
		if (res.ok) return { props: { deliberation: await res.json() } };
		return {
			status: res.status,
			error: new Error()
		};
	}
</script>

<script lang="ts">
	import {Content} from 'carbon-components-svelte'

	export let deliberation;
	$: console.log(deliberation)

	// const onSubmit = (e) => {
	// 	fetch('http://127.0.0.1:8984/cbc/deliberations/post', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-type': 'application/json',
	// 		},
	// 		body: JSON.stringify(deliberation)
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => console.log(data))
	// 	.catch(err => console.log(err))

		async function onSubmit(e) {
			
			const res = await fetch('http://127.0.0.1:8984/cbc/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(deliberation)
			})

			const result = await res.json() 

			console.log(result)
		}
</script>


<svelte:head>
	<title>Délibération</title>
</svelte:head>

<Content>
<div>
	<h1>Délibération {deliberation.id}</h1>
	<ul>
		<li>Titre : {deliberation.title ? deliberation.title : "- –"}</li>
		<li>Date : {deliberation.date ? deliberation.date : "- –"}</li>
		<li>Item : {deliberation.item ? deliberation.item : "- –"}</li>
		<li>Pages : {deliberation.pages ? deliberation.pages : "- –"}</li>
  </ul>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="titre">Titre :</label>
			<input name="title" type="text" bind:value={deliberation.title} />
		</div>
		<div>
			<label for="date">Date :</label>
			<input name="date" type="text" bind:value={deliberation.date} />
		</div>
		<div>
			<label for="item">Item :</label>
			<input name="item" type="text" bind:value={deliberation.item} />
		</div>
		<div>
			<label for="pages">Pages :</label>
			<input name="pages" type="text" bind:value={deliberation.pages} />
		</div>
		<input type="submit" value="submit"/>
</form>
</div>
</Content>