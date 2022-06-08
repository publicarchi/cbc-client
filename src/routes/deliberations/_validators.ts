import * as yup from 'yup'
import { deliberationSchema } from '$lib/types/cbcSchemas';

export const validateSchema = deliberationSchema.shape({
    title: yup
        .string()
        .required("Merci d'indiquer un titre.")
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
});

// We only warn if the user has already started typing a value
export const warnSchema = yup.object({})

export type schemaType = yup.InferType<typeof validateSchema>