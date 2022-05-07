<script lang="ts">
	import { Grid, Row, Column } from 'carbon-components-svelte'

	export let deliberations
</script>

<Grid padding={true}>
	<Row>
		<h4>{deliberations.length} sont attachées à cette affaire</h4>
		{#each deliberations as d}
			<Column>
				<h4>{d.cote}</h4>
			</Column>
		{/each}
	</Row>
	<Row>
		{#each deliberations as d}
			<Column>
				<h4>{d.cote}</h4>
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
