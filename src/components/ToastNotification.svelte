<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte'
	import { notificationState } from '$stores'
	import { fly } from 'svelte/transition'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	export let kind: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt' =
		$notificationState.kind
	export let title: string = $notificationState.title
	export let subtitle: string = $notificationState.msg
	export let caption: string = new Date().toLocaleString()
	export let lowContrast: boolean = true
	export let show = false

	onMount(() => {
		notificationState.subscribe((value) => {
			title = value.title
			subtitle = value.msg
			kind = value.kind
			show = $page.url.pathname === $notificationState.url
		})
	})

	const onClose = () => {
		notificationState.set({
			url: '',
			title: '',
			msg: '',
			kind: 'success'
		})
	}

	console.log(notificationState)
</script>

{#if show}
	<div class="toast-container" in:fly={{ x: 100 }}>
		<ToastNotification
			{lowContrast}
			{kind}
			{title}
			{subtitle}
			{caption}
			timeout={4000}
			on:close={onClose}
		/>
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
