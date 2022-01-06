<script lang="ts">
  // @todo add a default value for `title` and `date`
  // @todo get page title, etc. from route
  export let pageTitle ;
  export let date ;
  import { Content } from 'carbon-components-svelte';
</script>

<Content>
  <h1>{pageTitle}</h1>
  <p>Publié le {date}</p>
  <slot />
</Content>