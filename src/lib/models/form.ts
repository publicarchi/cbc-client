import type { formType } from '../types/form.type';

// Messages d'erreur généraux
// const STRING_FORMAT_ERROR = 'Entrer un chaine de caractère';
// const REQUIERED_ERROR = 'Ce champs est requis';

export const form: formType = {
	cote: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: false,
		required: false
	},
	cotesDessins: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: false,
		required: false
	},
	seance: {
		validators: [],
		type: 'date',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	remarques: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: false,
		required: false
	},
	commune: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	region: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	departement: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	departementDecimal: {
		validators: [],
		type: 'number',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	adress: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	departementAncien: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	id: {
		validators: [],
		type: 'text',
		validity: {
			typeMismatch: 'Entrer une chaine de caractère',
			valueMissing: 'Un identifiant est nécessaire',
			patternMismatch: "Le format de l'identifiant est incorrect"
		},
		errors: [],
		editable: false,
		required: false
	},
	title: {
		validators: [],
		type: 'text',
		validity: {
			typeMismatch: 'Entrer une chaine de caractère',
			valueMissing: 'Entrer un titre',
			patternMismatch: "Le format de l'identifiant est incorrect"
		},
		errors: [],
		editable: true,
		required: false
	},
	rapporteur: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	advice: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: true,
		required: false
	},
	item: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: false,
		required: false
	},
	pages: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: false,
		required: false
	},
	types: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: false,
		required: false
	},
	categories: {
		validators: [],
		type: 'text',
		validity: { typeMismatch: '', valueMissing: '', patternMismatch: '' },
		errors: [],
		editable: false,
		required: false
	}
};

// Si pas de titre, donner type et localisation
// id : repère visiuel, à mettre en marge
// categories = type d'intervention
export const formGroups = [
	{
		keys: ['title', 'seance'],
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
		keys: ['rapporteur', 'advice'],
		name: 'Avis et décision'
	}
];

// cf présentation détaillée Conbavil
// https://www.inha.fr/fr/ressources/outils-documentaires/conseil-des-batiments-civils-conbavil.html
export const labelMap = {
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
	recommandation: 'Recommandation(s)',
	advice: 'Recommandation(s)',
	item: "Nombre d'items",
	pages: 'Numéros de pages'
};
