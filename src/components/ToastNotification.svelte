<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte'
	import { fly } from 'svelte/transition'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	export let kind: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt'
	export let title: string
	export let subtitle: string
	export let caption: string = new Date().toLocaleString()
	export let lowContrast: boolean = true
	export let show = false
</script>

{#if show}
	<div class="toast-container" in:fly={{ x: 100 }}>
		<ToastNotification {lowContrast} {kind} {title} {subtitle} {caption} timeout={4000} />
	</div>

	<style>
		.toast-container {
			z-index: 1;
			position: absolute;
			margin-left: 65%;
		}

		.toast-container > div {
			width: 100%;
		}
	</style>
{/if}
