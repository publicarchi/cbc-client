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

<h1>Data</h1>

<form method="post" action="?/createDeliberation">
	<button type="submit">Should invalidate cache</button>
</form>

<select name="select" id="select" onchange={(e) => update(e)}>
	<option value="files" selected>files</option>
	<option value="deliberations">deliberations</option>
	<option value="meetings">meetings</option>
</select>
<pre id="pre">{JSON.stringify(meta, null, '\t')}</pre>
<pre>
	{JSON.stringify(content, null, '\t')}
</pre>
