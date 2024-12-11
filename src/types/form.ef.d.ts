import {schema} from '@/schemas/ef.schema'

export type FormEF = UseFormReturn<z.infer<typeof schema>>