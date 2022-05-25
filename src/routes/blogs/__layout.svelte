<script lang="ts">
	// @todo add a default value for `title` and `date`
	// @todo get page title, etc. from route
	export let pageTitle
	export let date
</script>

<div class="cbc-container">
	<div class="cbc-content">
		<h1>{pageTitle}</h1>
		<p>Publié le {date}</p>
		<slot />
	</div>
</div>
