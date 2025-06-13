<script lang="ts">
	let { data } = $props();
</script>

<div class="datas_cartels">
	<article class="cartel" data-datas-idx="0">
		<div class="cartel_content">
			<div class="cartel_header">
				<div class="cartel_headerCont">
					<p class="f1-18">0. 17 july 1786 au 19 october 1786</p>
					<h3 class="f1-18 txt-700">
						«&nbsp;Réception d’ouvrages en une maison rue Thiroux
						appartenant au sieur Maureau, négociant&nbsp;»
					</h3>
					<p class="f1-14">
						<strong>Lieu :</strong> Rue Thiroux (banlieue)
					</p>
				</div>
				<p class="cartel_visuel">
					<img
						class="cv cv-img"
						src="img/visuel2.jpg"
						alt="Texte alternatif"
					/>
				</p>
			</div>
			<div class="cartel_cols">
				<div class="cartel_col txt txt-f1 txt-xs">
					<p><strong>Expert(s)&nbsp;:</strong> Taboureur, Pierre</p>
				</div>
				<div class="cartel_col txt txt-f1 txt-xs">
					<p><strong>Parties&nbsp;:</strong></p>
					<ul>
						<li>
							Teisseraux, Pierre&nbsp;; Aubry, Jean-Baptiste&nbsp;; Selis,
							Jean Gérard&nbsp;; Legrand, Jacques&nbsp;; Sarciron,
							Gabriel&nbsp;; Leneuf, François&nbsp;; Boudet, Jean-François
						</li>
						<li>Moreau, Balthazar</li>
					</ul>
				</div>
				<div class="cartel_col txt txt-f1 txt-xs">
					<p>
						<strong>Catégorie :</strong> Recevoir et évaluer le travail réalisé
					</p>
					<p><strong>Cote :</strong> Z1J 999, dossier n°&nbsp;012</p>
				</div>
			</div>
		</div>
		<div class="cartel_actions">
			<p
				class="cartel_action cartel_action-select form_check form_check-solo"
			>
				<label
					><input class="js-datas-select" type="checkbox" />
					<span><span class="srOnly">Sélectionner</span></span></label
				>
			</p>
			<p class="cartel_action cartel_action-view">
				<a href="fiche.php"
					><span data-icon="visibility"></span><span class=""></span></a
				>
			</p>
		</div>
	</article>
</div>
