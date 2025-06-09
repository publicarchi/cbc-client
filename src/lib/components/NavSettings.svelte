<script lang="ts">
	import { modal } from '$lib/stores/nav.svelte';

	const handleClick = (e: MouseEvent) => {
		if (!modal.settings) {
			modal.settings = true;
			modal.toggle = false;
		} else {
			modal.settings = false;
		}
	};
</script>

<p class="header_btn header_btn-settings">
	<button
		class="js-panel-toggle"
		type="button"
		aria-haspopup="dialog"
		aria-controls="settingsModal"
		aria-expanded={modal.settings}
		onclick={handleClick}
	>
		<span data-icon="settings"></span><span class="srOnly">Ouvrir les réglages d’accessibilité</span
		>
	</button>
</p>
<div
	id="settingsModal"
	role="dialog"
	aria-modal="true"
	aria-labelledby="settingsModalTitle"
	class="header_settings settings"
	aria-hidden={!modal.settings}
>
	<button class="srOnly js-panel-close">Fermer les réglages d’accessibilité</button>
	<p id="settingsModalTitle" class="srOnly">Réglages d’accessibilité</p>
	<div
		class="settings_item settings_item-size"
		role="group"
		aria-labelledby="settingsTextSizeTitle"
	>
		<p class="settings_label f1-30" id="settingsTextSizeTitle">Taille du texte</p>
		<p class="settings_btns">
			<button class="btn btn-c btn-icon js-settings-size-dec" type="button">
				<span data-icon="remove"></span><span class="srOnly">Diminuer la taille du texte</span>
			</button>
			<button class="btn btn-c btn-icon js-settings-size-inc" type="button">
				<span data-icon="add"></span><span class="srOnly">Augmenter la taille du texte</span>
			</button>
		</p>
	</div>
	<fieldset class="settings_item settings_item-theme">
		<legend class="srOnly">Sélectionner le thème des couleurs pour la lecture</legend>
		<p class="settings_label f1-30" aria-hidden="true">Thème</p>
		<p class="settings_btns">
			<label class="btn btn-light btn-icon btn-check">
				<input name="color-theme-radios" type="radio" value="light" checked /><span
					data-icon="check"
				></span><span class="srOnly">Clair</span>
			</label>
			<label class="btn btn-dark btn-icon btn-check">
				<input name="color-theme-radios" type="radio" value="dark" /><span data-icon="check"
				></span><span class="srOnly">Foncé</span>
			</label>
		</p>
	</fieldset>
	<div class="settings_item settings_item-r settings_item-historique">
		<p class="settings_label f1-30">Historique</p>
		<p class="settings_btns">
			<a class="btn btn-g" href="historique.php">Accéder à l’historique de navigation</a>
		</p>
	</div>
	<div class="settings_item settings_item-reset">
		<p class="settings_btns">
			<button class="btn btn-g js-settings-reset" type="button">
				<span data-icon="refresh"></span><span>Retour aux réglages par défaut</span>
			</button>
		</p>
	</div>
</div>
