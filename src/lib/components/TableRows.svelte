<script lang="ts">
	import { selectedHeadings } from '$lib/components/Table.svelte';
	let { data, config } = $props();

	const sortedHeadings = $derived(
		selectedHeadings.items.toSorted((a, b) => a.position - b.position)
	);

	const handlers = {
		expand: (e: Event) => {
			if (!e.target) return console.warn('problem exapanding row');
			const tr = (e.target as HTMLButtonElement).closest('tr');
			tr?.classList.toggle('is-expanded');
		}
	};
</script>

{#each config.defautlTh as th}
	<h1>{th}</h1>
{/each}
<div class="datas_tableWrapper">
	<table class="datas_table js-stripped">
		<thead>
			<tr>
				<th scope="col" class="is-bulk">
					<span class="srOnly">Sélectionner</span>
				</th>
				<th scope="col" class="is-expand">
					<span class="srOnly">Développer</span>
				</th>
				{#each sortedHeadings as h}
					<th scope="col" class={config.headings[h.value].class}>
						<span class="datas_th">
							<span data-icon="drag_indicator" class="datas_handle">
							</span>
							{config.headings[h.value].label}
							<button
								aria-label="sort button"
								type="button"
								data-icon="arrow_downward"
								class="datas_order"
							>
							</button>
						</span>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data.content as d, i}
				<tr data-datas-idx={i} class={`${i % 2 === 0 ? '' : 'is-odd'}`}>
					<td>
						<div class="form_check form_check-solo">
							<label>
								<input class="js-datas-select" type="checkbox" />
								<span>
									<span class="srOnly">Sélectionner</span>
								</span>
							</label>
						</div>
					</td>
					<td>
						<button
							type="button"
							class="js-datas-expand"
							onclick={handlers.expand}
						>
							<span data-icon="expand_more"> </span>
						</button>
					</td>
					{#each sortedHeadings as h}
						<td>{d[h.value]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
