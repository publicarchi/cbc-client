import * as yup from 'yup'

export const validateSchema = yup.object({
    title: yup
        .string()
        .required("Merci d'indiquer un titre.")
        .test(
            'is-long-enough',
            "Le titre n'est pas assez long",
            (value) => value ? value.length > 8 : true
        ),
    commune: yup.string(),
    communeAncien: yup.string(),
    departement: yup.string(),
    departementDecimal: yup
        .number()
        .min(1)
        .max(101)
        .test(
            'is-number',
            'Le département doit être un nombre entier',
            (value) => value ? Number.isInteger(value) : true
        ),
    region: yup.string(),
    buildingTypes: yup.array().of(yup.string()),
    buildingCategories: yup.array().of(yup.string()),
    administrativeObjects: yup.array().of(yup.string()),
});

// We only warn if the user has already started typing a value
export const warnSchema = yup.object({})

export type schemaType = yup.InferType<typeof validateSchema>