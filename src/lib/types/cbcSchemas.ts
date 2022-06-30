import { string, number, array, object, mixed } from 'yup'

const metaSchema = object({
    who: string().required(),
    type: string().required(),
    when: string().required().default(() => new Date().toISOString())
})

export const paginationSchema = object({
    start: number().required(),
    count: number().required(),
    totalItems: number().required(),
    currentPage: number()
})

export const localisationSchema = object({
    adress: string(),
    commune: string(),
    communeAncien: string(),
    departement: string(),
    departementDecimal: mixed(),
    region: string(),
})


export const deliberationSchema = object({
    id: string().required(),
    meetingId: string().required(),
    affairId: string(),
    cote: string(),
    title: string(),
    altTitle: string(),
    localisation: localisationSchema,
    buildingTypes: array(string()),
    buildingCategories: array(string()),
    administrativeObjects: array(string()),
    report: string(),
    recommandation: string(),
    advice: string(),
    meta: array(metaSchema)
})

export const affairSchema = object({
    id: string().required(),
    title: string(),
    localisation: localisationSchema,
    types: array(string()),
    deliberations: array(deliberationSchema),
    meta: array(metaSchema)
})

export const meetingSchema = object({})
