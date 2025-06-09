<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { get } from '$lib/utils/api';

	let { data } = $props();
	let content = $state(data.content);
	let meta = $state(data.meta);

	const update = async (e: Event) => {
		const select = e.target as HTMLSelectElement;
		const value = select.value;

		get[value as string]()
			.then((res) => res.json())
			.then((d) => (content = d));
	};
</script>
