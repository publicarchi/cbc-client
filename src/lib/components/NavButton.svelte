<script lang="ts">
	import { uid } from '$lib/utils/helpers';
	import { modal } from '$lib/stores/nav.svelte';

	let { title, content, children } = $props();
	const id = uid('nav-lk-');
	let toggle = $derived(modal.toggle && modal.target === id ? 'is-open' : '');

	const handleHrefClick = (e: MouseEvent) => {
		e.preventDefault();
		const target = e.target as HTMLElement;
		if (!target) return;

		if (!modal.toggle) {
			modal.toggle = true;
			modal.target = target.id;
			modal.settings = false;
			document.getElementsByTagName('html')[0].classList.toggle('has-subnavOpen');
		} else if (modal.toggle && modal.target !== target.id) {
			modal.target = target.id;
		} else if (modal.toggle && modal.target === target.id) {
			modal.toggle = false;
			document.getElementsByTagName('html')[0].classList.toggle('has-subnavOpen');
		}
	};
</script>

<li class={`nav_i ${toggle}`}>
	<a
		{id}
		class="nav_lk f1-16"
		href="#sommaire"
		onclick={handleHrefClick}
		aria-haspopup="true"
		role="menuitem"
		aria-expanded={modal.toggle}
		aria-controls={`menu-item-${id}`}
	>
		{title}
	</a>

	<div class="nav_sub navSub">
		<div class="navSub_content f1-16">
			<p>{@render content()}</p>
			<p><a href="sommaire.php">En savoir plus</a></p>
		</div>
		<ul class="navSub_list">
			{@render children()}
		</ul>
	</div>
</li>
