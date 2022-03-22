type formType = {
	[inputName: string]: {
		type: string;
		pattern: string;
		disabled: boolean;
		required: boolean;
		validityMessage: string;
	};
};

// Messages d'erreur généraux
// const STRING_FORMAT_ERROR = 'Entrer un chaine de caractère';
// const REQUIERED_ERROR = 'Ce champs est requis';

export const form: formType = {
	cote: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: true
	},
	cotesDessins: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	seance: {
		type: 'date',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: true
	},
	remarques: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	commune: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	region: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	departement: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	departementDecimal: {
		type: 'number',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	adress: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	departementAncien: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	id: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: true,
		required: false
	},
	title: {
		type: 'text',
		pattern: '.{8,}',
		validityMessage: 'Au moins 8 caractères',
		disabled: false,
		required: true
	},
	rapporteur: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	recommendation: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	item: {
		type: 'number',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	pages: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	types: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	categories: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	},
	report: {
		type: 'text',
		pattern: null,
		validityMessage: '',
		disabled: false,
		required: false
	}
};

// Si pas de titre, donner type et localisation
// id : repère visiuel, à mettre en marge
// categories = type d'intervention
export const formGroups = [
	{
		keys: ['title', 'seance', 'id'],
		name: "Identification de l'affaire"
	},
	{
		keys: ['types', 'categories'],
		name: "Désignation de l'édifice et type d'intervention"
	},
	{
		keys: ['localisation'],
		name: "Localisation de l'édifice",
		subkeys: [
			'commune',
			'region',
			'departement',
			'departementDecimal',
			'departementAncien',
			'adress'
		]
	},
	{
		keys: ['cote', 'item', 'pages', 'cotesDessins', 'remarques'],
		name: 'Références des sources aux Archives Nationales'
	},
	{
		keys: ['rapporteur', 'recommendation', 'report'],
		name: 'Avis et décision'
	}
];

// cf présentation détaillée Conbavil
// https://www.inha.fr/fr/ressources/outils-documentaires/conseil-des-batiments-civils-conbavil.html
export const labelMap = {
	id: 'Identifiant dans la base',
	cote: 'Cote du rapport',
	cotesDessins: 'Cote(s) du (des) dessin(s)',
	seance: 'Date de discussion du rapport',
	remarques: 'Remarques',
	commune: 'Commune',
	region: 'Région',
	departement: 'Département',
	departementDecimal: 'Code postal du département',
	departementAncien: 'Département ancien',
	adress: 'Adresse',
	title: 'Titre',
	types: 'Dénomination(s)',
	categories: "Types d'intervention",
	rapporteur: 'Auteur(s), données transcrite du rapport',
	recommendation: 'Recommandation(s)',
	item: "Nombre d'items",
	pages: 'Numéros de pages',
	report: 'Report'
};

export const labelMapAbbr = {
	id: 'ID',
	cote: 'Cote',
	cotesDessins: 'Cote(s) dessin(s)',
	seance: 'Date séance',
	remarques: 'Remarques',
	commune: 'Commune',
	region: 'Région',
	departement: 'Département',
	departementDecimal: 'Code postal',
	departementAncien: 'Département ancien',
	adress: 'Adresse',
	title: 'Titre',
	types: 'Dénomination',
	categories: 'Interventions',
	rapporteur: 'Rapporteur',
	recommendation: 'Recommandation',
	item: 'Items',
	pages: 'Pages',
	report: 'Report'
};
