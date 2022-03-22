<script lang="ts">
	import { Grid, Row, Column } from 'carbon-components-svelte';
	import { formGroups, labelMapAbbr } from '$lib/types/form';
	import { getDeliberationTitle } from '$lib/helpers/deliberationHelpers';

	export let deliberation;
</script>

<Grid padding={true}>
	<Row>
		{#each formGroups as g}
			<Column sm={0.5} padding={true}>
				<h4>{g.name}</h4>
				{#each g.keys as k}
					{#if k === 'localisation'}
						{#each g.subkeys as sk}
							<div class="data-group">
								<span class="data-group-label">{labelMapAbbr[sk]}</span>
								<span class="data-group-value">{deliberation[k][sk]}</span>
							</div>
						{/each}
					{:else if k === 'title'}
						<div class="data-group">
							<span class="data-group-label">{labelMapAbbr[k]}</span>
							<span class="data-group-value">{getDeliberationTitle(deliberation)}</span>
						</div>
					{:else}
						<div class="data-group">
							<span class="data-group-label">{labelMapAbbr[k]}</span>
							<span class="data-group-value">{deliberation[k]}</span>
						</div>
					{/if}
				{/each}
			</Column>
		{/each}
	</Row>
</Grid>

<style>
	h4 {
		font-size: 14px;
		font-weight: 200;
		margin-top: 1em;
		width: 270px;
	}
	.data-group {
		display: flex;
		margin-top: 0.5em;
	}
	.data-group-label {
		font-weight: bold;
		font-size: 11px;
		width: 100px;
	}
	.data-group-value {
		font-size: 11px;
		width: 140px;
	}
</style>
