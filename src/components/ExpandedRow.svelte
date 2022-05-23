<script lang="ts">
	import { resolvePath } from '$lib/helpers/resolvePath'
	import { Link, UnorderedList, ListItem } from 'carbon-components-svelte'
	import type { IDeliberation, IAffaire } from '$lib/types/cbc'
	import type { IExpandedRowOption } from '$lib/types/expandedRowOptions'

	export let options: IExpandedRowOption[]
	export let data: IDeliberation | IAffaire

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
		<h4>{opt.head}</h4>
		<UnorderedList>
			{#if typeof opt.content === 'string' && typeof resolvePath(data, opt.content) === 'object'}
				{#each resolvePath(data, opt.content) as item}
					{#if typeof item === 'object'}
						<ListItem>
							{#if opt.link}
								<Link href={`${opt.link.path}/${resolvePath(item, opt.link.slug)}`}>
									{resolvePath(item, opt.link.text)}
								</Link>
							{/if}
						</ListItem>
					{/if}
				{/each}
			{/if}
		</UnorderedList>
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
		gap: 1em;
		margin-bottom: 1.5em;
	}
	.data-group {
		display: flex;
		margin-top: 0.5em;
	}
	.data-group-label {
		font-weight: bold;
		font-size: 11px;
		width: 110px;
	}
	.data-group-value {
		font-size: 11px;
		width: 180px;
	}
</style>
