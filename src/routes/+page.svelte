<script lang="ts">
	import { get } from '$lib/utils/api';
	import { PageHeader, Table } from '$lib/components';

	let { data } = $props();
	let { meta, content } = data;

	const update = async (e: Event) => {
		const select = e.target as HTMLSelectElement;
		const value = select.value;

		get[value as string]()
			.then((res) => res.json())
			.then((d) => (content = d));
	};
</script>

Home
