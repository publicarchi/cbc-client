<script lang="ts">
	import { resolvePath } from '$helpers'
	import { Link, UnorderedList, ListItem } from 'carbon-components-svelte'
	import type { Deliberation, Affair } from '$lib/types/cbc'
	import type { IExpandedRowOption } from '$lib/types/expandedRowOptions'

	export let options: IExpandedRowOption[]
	export let data: Deliberation | Affair

	let metaOptions = options.filter((o) => o.type === 'meta')
	let listOptions = options.filter((o) => o.type === 'list')
</script>

<div class="container">
	{#each metaOptions as opt}
		<div class="section">
			<h4>{opt.head}</h4>
			{#each opt.content as c}
				<div class="data-group">
					<span class="data-group-label">{typeof c === 'string' ? c : c.value}</span>
					<span class="data-group-value"
						>{resolvePath(data, typeof c === 'string' ? c : c.key)}</span
					>
				</div>
			{/each}
		</div>
	{/each}

	{#each listOptions as opt}
		<div class="section">
			<h4>{opt.head}</h4>
			{#if typeof opt.content === 'string' && typeof resolvePath(data, opt.content) === 'object'}
				{#each resolvePath(data, opt.content) as item}
					{#if typeof item === 'object'}
						<div class="data-group">
							{#if opt.link}
								<Link class="list" href={`${opt.link.path}/${resolvePath(item, opt.link.slug)}`}>
									<span style="font-size: 11px;">
										{resolvePath(item, opt.link.text)}
									</span>
								</Link>
							{/if}
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	{/each}
</div>

<style>
	h4 {
		font-size: 14px;
		font-weight: 200;
		margin-top: 1em;
		width: 290px;
	}
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--gap, 1em);
		margin-bottom: 1.5em;
		font-size: var(--font-small, 11px);
	}
	.data-group {
		display: flex;
		margin-top: 0.5em;
	}
	.data-group-label {
		font-weight: bold;
		font-size: --font-small;
		width: 110px;
	}
	.data-group-value {
		font-size: --font-small;
		width: 180px;
	}
</style>
