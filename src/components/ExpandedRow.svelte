<script lang="ts">
    import { resolvePath } from '$lib/helpers/resolvePath.ts'
    import { Grid, Row, Column, Link, UnorderedList, ListItem } from 'carbon-components-svelte'

    export let options
    export let data

    let metaOptions = options.filter(o => o.type === 'meta')
    let listOptions = options.filter(o => o.type === 'list')
</script>

<Grid padding={true}>
    <Row>
        {#each metaOptions as opt}
            <Column>
                <h4>{opt.head}</h4>
                {#each opt.content as c}
                    <div class="data-group">
                        <span class="data-group-label">{c.value}</span>
                        <span class="data-group-value">{resolvePath(data, c.key)}</span>
                    </div>
                {/each}
            </Column>
        {/each}
    </Row>
    <Row>
        {#each listOptions as opt}
            <Column>
                <h4>{opt.head}</h4>
                <UnorderedList>
                    {#each resolvePath(data, opt.content) as item}
                        <ListItem>
                            {#if opt.link}
                                <Link href={`${opt.link.path}/${resolvePath(item, opt.link.slug)}`}>
                                    {resolvePath(item, opt.link.text)}
                                </Link>
                            {/if}
                        </ListItem>
                    {/each}
                </UnorderedList>
            </Column>
        {/each}
    </Row>
</Grid>

<style>
	h4 {
		font-size: 14px;
		font-weight: 200;
		margin-top: 1em;
		width: 290px;
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