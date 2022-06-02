import * as yup from 'yup'
import { affairSchema } from '$lib/types/cbcSchemas'

// extends affairSchema
export const validateSchema = affairSchema.shape({
    title: yup
        .string()
        .required("Merci d'indiquer un titre")
        .test(
            'is-long-enough',
            "Le titre n'est pas assez long",
            (value) => value ? value.length > 8 : true
        ),
    departementDecimal: yup
        .number()
        .min(1)
        .max(101)
        .test(
            'is-integer',
            'Le département doit être un nombre entier',
            (value) => value ? Number.isInteger(value) : true
        ),
})

// doesn't block submit
export const warnSchema = affairSchema

export type validateSchemaType = yup.InferType<typeof validateSchema>


