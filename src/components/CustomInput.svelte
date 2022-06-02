<script lang="ts">
	import { FormLabel, TextInput, TextArea, NumberInput } from 'carbon-components-svelte'
	import Select from 'svelte-select'
	import { ValidationMessage } from '@felte/reporter-svelte'

	export let name: string
	export let label: string
	export let type: 'text' | 'number' | 'area' | 'multi' = 'text'
	export let items: { value: string; label: string }[] = []
</script>

<div>
	<FormLabel>{label}</FormLabel>
	{#if type === 'area'}
		<TextArea {name} />
	{:else if type === 'number'}
		<NumberInput {name} allowEmpty />
	{:else if type === 'multi'}
		<Select {items} id={name} />
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
	.form-error {
		color: red;
	}
	.form-warning {
		color: gray;
	}
</style>
