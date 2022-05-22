import type { IExpandedRowOption } from "$lib/types/expandedRowOptions"

const expandedRowOptions: IExpandedRowOption[] = [
    {
        head: "Identidication de l'affaire",
        type: 'meta',
        content: [
            { key: 'title', value: 'Titre' },
            { key: 'date', value: 'Date de la séance' },
            { key: 'id', value: 'ID' }
        ]
    },
    {
        head: "Liste des délibérations",
        type: 'list',
        content: 'deliberations',
        link: { path: '/deliberations', slug: 'id', text: 'altTitle' }
    }
]

export default expandedRowOptions