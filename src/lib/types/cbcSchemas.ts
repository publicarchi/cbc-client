import { string, number, array, object } from 'yup'

const metaSchema = object({
    who: string().required(),
    type: string().required(),
    when: string().required()
})

export const localisationSchema = object({
    adress: string(),
    commune: string(),
    communeAncien: string(),
    departement: string(),
    departementDecimal: number().min(1).max(101),
    region: string(),
})

const participantSchema = object({
    name: string(),
    occupation: string(),
    role: string()
})

export const deliberationSchema = object({
    id: string().required(),
    meetingId: string().required(),
    affairId: string().required(),
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
    participants: array(participantSchema),
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
