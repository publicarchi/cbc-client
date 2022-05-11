import type { IAffaire, IDeliberation } from "../types/cbc"

export const initEmptyAffaire = (deliberations: IDeliberation[]): IAffaire => {
    return {
        id: '',
        title: '',
        localisation: {
            commune: '',
            departementDecimal: 0,
            departement: '',
            departementAncien: '',
            region: ''
        },
        types: [],
        deliberations: deliberations,
        meta: []
    }
}