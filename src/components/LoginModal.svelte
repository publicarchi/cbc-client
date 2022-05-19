<script>
	import {
		Modal,
		Form,
		FormItem,
		FormLabel,
		TextInput,
		ButtonSet,
		Button
	} from 'carbon-components-svelte'
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte'
	import LogoInstagram from 'carbon-icons-svelte/lib/LogoInstagram.svelte'
	export let open = false
</script>

<Modal
	bind:open
	size="sm"
	modalHeading="Connexion"
	passiveModal={true}
	hasForm={true}
	on:close={() => (open = false)}
>
	<Form>
		<FormItem>
			<FormLabel>Identifiant</FormLabel>
			<TextInput name="userID" />
		</FormItem>
		<FormItem>
			<FormLabel>Mot de passe</FormLabel>
			<TextInput kind="password" name="userPass" />
		</FormItem>
	</Form>
	<br />
	<p>Se connecter avec :</p>
	<br />
	<ButtonSet>
		<a rel="external" href="/oauth/github/login">
			<LogoGithub size={32} />
		</a>
	</ButtonSet>
</Modal>
