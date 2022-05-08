import type { ExpandedRowOptionsType } from "../../lib/types/expandedRowOptions"

const expandedRowOptions: ExpandedRowOptionsType = [
    {
        head: 'Identidication de la séance',
        type: 'meta',
        content: [
            { key: 'title', value: 'Titre' },
            { key: 'date', value: 'Date de la séance' },
            { key: 'id', value: 'ID' }
        ]
    },
    {
        head: "Édifices et types d'interventions",
        type: 'meta',
        content: [
            { key: 'types', value: 'Édifices' },
            { key: 'categories', value: 'Interventions' }
        ]
    },
    {
        head: "Localisation de l'édifice",
        type: 'meta',
        content: [
            { key: 'localisation.commune', value: 'Commune' },
            { key: 'localisation.communeAncien', value: 'Commune ancienne' },
            { key: 'localisation.departement', value: 'Département' },
            { key: 'localisation.departementDecimal', value: 'Code Dpt.' },
            { key: 'localisation.departementAncien', value: 'Département ancien' },
            { key: 'localisation.adress', value: 'Adresse' },
        ]
    },
    {
        head: "Recommandation(s)",
        type: 'meta',
        content: [
            { key: 'report', value: 'Rapporteur·euse·s' },
            { key: 'advice', value: 'Recommandation(s)' }
        ]
    },
    {
        head: "Références des sources aux Archives Nationales",
        type: 'meta',
        content: [
            { key: 'cote', value: 'Cote' },
            { key: 'items', value: 'Items' },
            { key: 'pages', value: 'Pages' },
            { key: 'remarques', value: 'Remarques' }
        ]
    },

]

export default expandedRowOptions