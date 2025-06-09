<script lang="ts">
	import { NavButton, NavSettings, NavResponsive, NavSubButton } from './';
</script>

<nav id="primaryNav" class="header_nav nav">
	<ul class="nav_list">
		<NavButton title="L'institution">
			{#snippet content()}
				Notre projet vise à examiner, à partir d’un secteur économique majeur — celui du bâtiment à
				l’époque moderne —, le mécanisme de l’expertise : comment la langue technique régulatrice
				des experts s’impose à la société, comment leur compétence se convertit en autorité, voire
				parfois en « abus d’autorité » ? L’existence d’un fonds d’archives exceptionnel (AN Z1J) qui
				conserve l’ensemble des procès-verbaux d’expertise du bâtiment parisien de 1643 à 1792 nous
				permet de lancer une enquête pluridisciplinaire d’envergure sur la question de l’expertise
				qui connaît, à partir de 1690, un tournant particulier. En effet, les experts, autrefois
				uniquement gens de métiers, se divisent en deux branches exerçant deux activités
				concurrentes, parfois complémentaires : l’architecture et l’entreprise de construction.
			{/snippet}
			<NavSubButton href="#sub-href">
				{#snippet title()}L'expertise et le droit{/snippet}
				{#snippet content()}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.{/snippet}
			</NavSubButton>
			<NavSubButton href="#sub-href">
				{#snippet title()}Histoire de l'institution{/snippet}
				{#snippet content()}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.{/snippet}
			</NavSubButton>
		</NavButton>
		<NavButton title="Les affaires">
			{#snippet content()}
				Notre projet vise à examiner, à partir d’un secteur économique majeur — celui du bâtiment à
				l’époque moderne —, le mécanisme de l’expertise : comment la langue technique régulatrice
				des experts s’impose à la société, comment leur compétence se convertit en autorité, voire
				parfois en « abus d’autorité » ? L’existence d’un fonds d’archives exceptionnel (AN Z1J) qui
				conserve l’ensemble des procès-verbaux d’expertise du bâtiment parisien de 1643 à 1792 nous
				permet de lancer une enquête pluridisciplinaire d’envergure sur la question de l’expertise
				qui connaît, à partir de 1690, un tournant particulier. En effet, les experts, autrefois
				uniquement gens de métiers, se divisent en deux branches exerçant deux activités
				concurrentes, parfois complémentaires : l’architecture et l’entreprise de construction.
			{/snippet}
			<NavSubButton href="#sub-href">
				{#snippet title()}Histoire de l'institution{/snippet}
				{#snippet content()}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.{/snippet}
			</NavSubButton>
			<NavSubButton href="#sub-href">
				{#snippet title()}Histoire de l'institution{/snippet}
				{#snippet content()}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.{/snippet}
			</NavSubButton>
		</NavButton>
	</ul>
</nav>
<NavSettings />
<NavResponsive />
