<script module>
	// Exported stores. Do not put in context.
	// Do not update here.
	export const selectedHeadings = $state({ items: [] } as {
		items: { position: number; value: string }[];
	});

	export type ContextType = {
		itemsPerPage: { count: number; total: number };
		view: { mode: 'card' | 'row' };
		pageCount: { current: number; total: number };
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	let { children } = $props();

	// Stores
	const view: { mode: 'card' | 'row' } = $state({ mode: 'row' });
	const itemsPerPage = $state({ count: 20, total: 100 });
	const pageCount = $state({ current: 1, total: 10 });
	let repo = $state(['*']);

	const handlers = {
		view: {
			table: () => (view.mode = 'row'),
			card: () => (view.mode = 'card'),
			expandRow: (e: Event) => {
				console.log(e.target);
			}
		},
		select: {
			itemsPerPage: (e: Event) => {
				itemsPerPage.count =
					Number((e.target as HTMLSelectElement)!.value) ?? 1;
				pageCount.current = 0;
			},
			pageCount: (e: Event) =>
				(pageCount.current =
					Number((e.target as HTMLSelectElement)!.value) ?? 1),
			repo: (e: Event) => {
				const btn = e.target as HTMLButtonElement;
				const attr = btn.getAttribute('data-filter-value');

				if (!btn || !attr) return;

				const isActive = btn.classList.contains('is-active');
				if (attr === '*' && !isActive) {
					btn.classList.toggle('is-active');
					repo = ['*'];
					document
						.querySelectorAll('button[data-filter-name="repertoire"]')
						.forEach((b) => b.classList.remove('is-active'));
					btn.classList.toggle('is-active');
				} else if (attr !== '*') {
					btn.classList.toggle('is-active');
					repo = repo.filter((item) => item !== '*');
					document
						.querySelector(
							'button[data-filter-name="repertoire"][data-filter-value="*"]'
						)
						?.classList.remove('is-active');
					if (!isActive) repo.push(attr);
					else repo = repo.filter((item) => item !== attr);
				}
			}
		},
		page: {
			next: () =>
				pageCount.current < pageCount.total ? pageCount.current++ : null,
			previous: () => (pageCount.current > 1 ? pageCount.current-- : null)
		},
		data: {
			filter: () => {},
			search: () => {
				const container = document.getElementById(
					'search-input-container'
				);
				const input = document.getElementById(
					'search-input'
				) as HTMLInputElement;
				if (!input || !container) return;

				container.classList.toggle('is-open');
				if (container.classList.contains('is-open')) input.focus();
			}
		}
	};

	// set contexts for rows and cards
	setContext('states', {
		view,
		itemsPerPage,
		pageCount
	} as ContextType);
	setContext('handlers', handlers);

	// Side effects for pageCount
	$effect(() => {
		const pageSelect = document.getElementById('page-count-select');
		pageSelect
			?.querySelectorAll('option')
			.forEach((o: HTMLOptionElement) => {
				const current = String(pageCount.current);
				o.value === current ? (o.selected = true) : (o.selected = false);
			});
	});
</script>

<section class={`base_datas ${view.mode === 'card' ? 'is-cartels' : ''}`}>
	<p class="base_view f1-16">
		<span>Affichage</span>
		<button
			type="button"
			class="js-base-ngeview-table"
			onclick={handlers.view.table}>Tableau</button
		>
		<button
			type="button"
			class="js-base-view-cartels"
			onclick={handlers.view.card}>Cartels</button
		>
	</p>
	<figure
		class="datas is-one-line has-drag has-expand has-order has-pagination has-pagination-top has-settings has-search has-filters has-bulk"
	>
		<div class="datas_footer">
			<label class="datas_nb">
				<span>Items par page</span>
				<select
					id="page-count-select"
					onchange={handlers.select.itemsPerPage}
				>
					{#each new Array(10) as _, i}
						{@const v = `${(i + 1) * 10}`}
						<option value={v}>{v}</option>
					{/each}
				</select>
			</label>
			<div class="datas_infos">
				<span data-datas-min=""
					>{pageCount.current * itemsPerPage.count}</span
				>–<span data-datas-max=""
					>{itemsPerPage.count +
						pageCount.current * itemsPerPage.count}</span
				>
				de
				<span data-datas-total="">{itemsPerPage.total}</span> items
			</div>
			<label class="datas_pages"
				><select
					id="page-count-select"
					onchange={handlers.select.pageCount}
				>
					{#each new Array(pageCount.total) as _, i}
						<option value={i + 1}>{i + 1}</option>
					{/each}
				</select><span
					>sur <span data-datas-pages-max="">{pageCount.total}</span> pages</span
				></label
			><button
				class="datas_nav datas_nav-prev"
				type="button"
				onclick={handlers.page.previous}
				><span class="srOnly">page précédente</span><span
					data-icon="arrow_left"
				></span></button
			><button
				class="datas_nav datas_nav-next"
				type="button"
				onclick={handlers.page.next}
				><span class="srOnly">page suivante</span><span
					data-icon="arrow_right"
				></span></button
			>
		</div>
		<div class="datas_header">
			<div class="datas_buttons">
				<ul class="datas_buttonsRow datas_buttonsRow-filters">
					<li>
						<a
							href="/cbc"
							type="button"
							class="btn btn-g is-active"
							data-filter-name="repertoire"
							data-filter-value="*">Tout</a
						>
					</li>
					<li>
						<a
							href="/cbc/deliberations"
							type="button"
							class="btn btn-g is-active"
							data-filter-name="repertoire"
							data-filter-value="*">Délibérations</a
						>
					</li>
					<li>
						<a
							href="/cbc/seances"
							type="button"
							class="btn btn-g"
							data-filter-name="repertoire"
							data-filter-value="Offices">Séances</a
						>
					</li>
					<li>
						<a
							href="/cbc/affaires"
							type="button"
							class="btn btn-g"
							data-filter-name="repertoire"
							data-filter-value="Experts">Affaires</a
						>
					</li>
				</ul>
				<div class="datas_buttonsRow">
					<a class="btn btn-g" href="fiche.php?selection"
						>Consulter la sélection</a
					>
					<a class="btn btn-g" href="#">Créer une affaire</a>
				</div>
			</div>
			<div class="datas_actions">
				<div class="datas_actionsRow">
					<button
						class="datas_filtersTrigger js-panel-toggle btn btn-g"
						type="button"
						aria-haspopup="dialog"
						aria-controls="datas-filters-643e171f08e3e8"
						aria-expanded="false"
						>Filtrer <span data-icon="tune"></span><span class="srOnly"
							>Filtres de la base de données</span
						></button
					>
					<div id="search-input-container" class="datas_search">
						<button
							class="btn btn-g btn-icon"
							type="button"
							onclick={handlers.data.search}
							><span data-icon="search"></span><span class="srOnly"
								>Ouvrir / fermer la recherche</span
							></button
						><input id="search-input" type="text" value="" />
					</div>
				</div>
				<div class="datas_actionsRow">
					<button
						class="datas_settingsTrigger js-panel-toggle btn btn-g btn-icon"
						type="button"
						aria-haspopup="dialog"
						aria-controls="datas-settings-73575726d78b68"
						aria-expanded="false"
						><span data-icon="settings"></span><span class="srOnly"
							>Réglages du tableau</span
						></button
					>
				</div>
			</div>
		</div>

		{@render children()}

		<div class="datas_footer">
			<label class="datas_nb"
				><span>Items par page</span>
				<select onchange={handlers.select.itemsPerPage}>
					{#each new Array(10) as _, i}
						{@const v = `${(i + 1) * 10}`}
						<option value={v}>{v}</option>
					{/each}
				</select>
			</label>
			<div class="datas_infos">
				<span data-datas-min="">1</span>–<span data-datas-max="">10</span>
				de
				<span data-datas-total="">116</span> items
			</div>
			<label class="datas_pages">
				<select
					><option value="1">1</option><option value="2">2</option><option
						value="3">3</option
					><option value="4">4</option><option value="5">5</option><option
						value="6">6</option
					><option value="7">7</option><option value="8">8</option><option
						value="9">9</option
					><option value="10">10</option><option value="11">11</option
					><option value="12">12</option>
				</select>
				<span>sur <span data-datas-pages-max="">12</span> pages</span
				></label
			><button class="datas_nav datas_nav-prev" type="button"
				><span class="srOnly">page précédente</span><span
					data-icon="arrow_left"
				></span></button
			><button class="datas_nav datas_nav-next" type="button"
				><span class="srOnly">page précédente</span><span
					data-icon="arrow_right"
				></span></button
			>
		</div>
	</figure>
</section>
