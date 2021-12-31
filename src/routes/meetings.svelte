<script context="module" lang="ts">
  // import { fetchMeetings } from './calls';
  /** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `http://127.0.0.1:8984/cbc/meetings`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					meetings: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
  	import Pagination from "$lib/composants/Pagination.svelte" ;
	import { Content, OrderedList, ListItem } from 'carbon-components-svelte'
  export let meetings ;
</script>


<svelte:head>
	<title>Séances</title>
</svelte:head>

<Content>
	<h1>Séances du Conseil des bâtiments civils</h1>

	<Pagination />


	<OrderedList>
		{#each meetings as meeting}
		<ListItem>{meeting.title} - {meeting.date}</ListItem>
		<ListItem>
			<OrderedList nested>
				{#each meeting.deliberations as deliberation}
				<ListItem>
					<a href={'deliberations/' + deliberation.id}>{deliberation.id}</a> - {deliberation.title} -
					{deliberation.commune}
				</ListItem>
				{/each}
			</OrderedList>
		</ListItem>
		{/each}
	</OrderedList>



	<!-- {#each meetings as meeting}
		<div class="meeting">
			<span>{meeting.title}</span>
			<span>{meeting.date}</span>
			<ul>
				{#each meeting.deliberations as deliberation}
					<li>
						<a href={'deliberations/' + deliberation.id}>{deliberation.id}</a> - {deliberation.title} -
						{deliberation.commune}
					</li>
				{/each}
			</ul>
		</div>
	{/each} -->
</Content>


<!-- {#await}
  <p>Chargement des données...</p>
  {:then data}
    {#each data as meeting}
      <div class='meeting'>
        <span>{meeting.title}</span>
        <span>{meeting.date}</span>
        <ul>
            {#each meeting.deliberations as deliberation}
                <li> <a href={"deliberations/" + deliberation.id}>{deliberation.id}</a> - {deliberation.title} - {deliberation.commune}</li>
            {/each}
        </ul>
      </div>
    {/each}
{/await} -->