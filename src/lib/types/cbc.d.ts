import * as Yup from 'yup'
import { deliberationSchema, affairSchema, meetingSchema, localisationSchema } from './cbcSchemas'

export type Deliberation = Yup.InferType<typeof deliberationSchema>
export type Affair = Yup.InferType<typeof affairSchema>
export type Meeting = Yup.InferType<typeof meetingSchema>
export type Localisation = Yup.InferType<typeof localisationSchema>