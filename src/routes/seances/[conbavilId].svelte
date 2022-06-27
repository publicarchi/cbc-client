<script lang="ts">
	import { Link } from 'carbon-components-svelte'
	import { Gallery } from '$components'

	export let meeting
</script>

<svelte:head>
	<title>Séance {meeting.id}</title>
</svelte:head>

<div class="cbc-container-grid">
	<div class="cbc-aside">
		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Titre</span>
			<span class="cbc-aside-field-value">{meeting.title}</span>
		</div>
		<div class="cbc-separator" />
		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Cote</span>
			<span class="cbc-aside-field-value">{meeting.cote}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Cote dev</span>
			<span class="cbc-aside-field-value">{meeting.coteDev}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Date de la séance</span>
			<span class="cbc-aside-field-value">{meeting.date}</span>
		</div>
		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Pages</span>
			<span class="cbc-aside-field-value">{meeting.pages.pages}</span>
		</div>

		<div class="cbc-separator" />

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label">Délibérations</span>

			<ul>
				{#each meeting.deliberations as d}
					<li>
						<Link href={`/deliberations/${d.id}`}>{d.title ? d.title : d.altTitle}</Link>
					</li>
				{/each}
			</ul>
		</div>

		<div class="cbc-aside-field">
			<span class="cbc-aside-field-label" />
			<span class="cbc-aside-field-value" />
		</div>
	</div>
</div>
