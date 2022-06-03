import type { Affair } from "$lib/types/cbc"

const affair = (): Affair => {
    return {
        id: '',
        title: '',
        deliberations: [],
        localisation: {
            adress: '',
            commune: '',
            departement: '',
            departementDecimal: 1,
            region: '',
            communeAncien: ''
        },
        meta: [],
        types: []
    }
}

const cbc = {
    affair
}

export default cbc