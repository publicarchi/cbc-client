<script lang="ts">
	import { FormLabel, TextInput, TextArea, NumberInput } from 'carbon-components-svelte'
	import { ValidationMessage } from '@felte/reporter-svelte'
	import { MultiSelect } from '$components'

	export let name: string = ''
	export let label: string = ''
	export let type: 'text' | 'number' | 'area' | 'multi' = 'text'

	export let items = []
	export let value = []
	export let listOpen: boolean = false

	let container
	// $: console.log('container', container)
</script>

<div class="cbc-custom-input">
	<FormLabel>{label}</FormLabel>
	{#if type === 'area'}
		<TextArea {name} />
	{:else if type === 'number'}
		<NumberInput {name} allowEmpty />
	{:else if type === 'multi'}
		<MultiSelect spellcheck={false} filterable {items} bind:checked={value} />
	{:else}
		<TextInput {name} />
	{/if}
	<ValidationMessage for={name} let:messages={message}>
		<span class="form-error">{message || ''}</span>
	</ValidationMessage>
	<ValidationMessage level="warning" for={name} let:messages={message}>
		<span class="form-warning">{message || ''}</span>
	</ValidationMessage>
</div>

<style>
	.cbc-custom-input {
		margin-bottom: 1rem;
	}
	.form-error {
		color: red;
	}
	.form-warning {
		color: gray;
	}

	.multi {
		border-bottom: 1px solid grey;
		--list-position: absolute !important;
		--list-left: 0 !important;
		--list-top: 0 !important;
		--border: 0px solid red;
		--background: #f4f4f4;
	}
</style>
