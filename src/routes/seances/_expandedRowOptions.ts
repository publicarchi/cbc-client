import type { ExpandedRowOptionsType } from "$lib/types/expandedRowOptions"

const expandedRowOptions: ExpandedRowOptionsType = [
    {
        head: 'Identidication de la séance',
        type: 'meta',
        content: [
            { key: 'title', value: 'Titre' },
            { key: 'date', value: 'Date' },
            { key: 'cote', value: 'Cote' },
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
        head: 'Liste des déliberations',
        type: 'list',
        content: 'deliberations',
        link: {
            path: '/deliberations',
            slug: 'id',
            text: 'altTitle'
        }
    }
]

export default expandedRowOptions