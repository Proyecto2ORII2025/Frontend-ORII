import { z } from 'zod';

export const agreementSchema = z.object({
    country: z.string().min(1, "El país es requerido"),
    agreementNumber: z.string().min(1, "El código es requerido"),
    institution: z.string().min(1, "La institución es requerida"),
    startDate: z.string().min(1, "La fecha de inicio es requerida"),
    scope: z.enum(["NATIONAL", "INTERNATIONAL"], {
        required_error: "El ámbito es requerido"
    }),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    status: z.literal("ACTIVE").default("ACTIVE"),
});

export type AgreementFormValues = z.infer<typeof agreementSchema>;
