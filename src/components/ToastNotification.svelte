<script lang="ts">
    import { ToastNotification } from 'carbon-components-svelte'
    import { fly } from 'svelte/transition'

    export let kind: "error"|"info"|"info-square"|"success"|"warning"|"warning-alt" = "success"
    export let lowContrast:boolean = true
    export let title:string = ''
    export let subtitle:string = ''
    export let caption:string = new Date().toLocaleString()
    export let onClose = () => null
</script>

<div class="toast-container" in:fly={{ x: 100 }}>
    <ToastNotification
            lowContrast={lowContrast}
            kind={kind}
            title={title}
            subtitle={subtitle}
            caption={caption}
            timeout={4000}
            on:close={onClose}
        />
</div>

<style>
    .toast-container {
		z-index:1;
        position: absolute;
        margin-left: 50%;
    }
</style>