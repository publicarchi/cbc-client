<script lang="ts">
  export let title ;
  export let date ;
  import { Content } from 'carbon-components-svelte';
</script>

<Content>
<h1>{title}</h1>
<p>Publié le {date}</p>

<slot />
</Content>