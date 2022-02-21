<script>
	import { Modal, Form, FormItem, TextInput, ButtonSet, Button } from 'carbon-components-svelte';
	import { LogoGithub16, LogoInstagram16 } from 'carbon-icons-svelte';
	export let open = false;
</script>

<Modal
	bind:open
	modalHeading="Connexion"
	passiveModal={true}
	hasForm={true}
	on:close={() => (open = false)}
>
	<Form>
		<FormItem>
			<TextInput label="Identifiant" />
		</FormItem>
		<FormItem>
			<TextInput kind="password" label="Mot de passe" />
		</FormItem>
	</Form>

	<p>Se connecter avec :</p>
	<ButtonSet>
		<Button size="small" icon={LogoGithub16} href="http://127.0.0.1:3000/oauth/github/login"
			>Github</Button
		>
		<Button size="small" icon={LogoInstagram16}>Instagram</Button>
	</ButtonSet>
</Modal>
