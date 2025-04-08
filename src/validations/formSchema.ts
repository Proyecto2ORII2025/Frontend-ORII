import { z } from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .min(1, "El nombre es obligatorio")
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo debe contener letras"),

    lastName: z
        .string()
        .min(1, "El apellido es obligatorio")
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo debe contener letras"),

    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("Ingrese un email válido")
        .refine((email) => email.endsWith("@unicauca.edu.co"), {
            message: "Este correo no es válido. Requiere @unicauca.edu.co",
        }),

    role: z
        .string()
        .min(1, "El rol es obligatorio")
        .refine(
            (role) => ["ADMIN", "USER"].includes(role),
            {
                message: "El rol debe ser Administrador o Usuario",
            }
        ),

    faculty: z
        .string()
        .min(1, "La facultad es obligatoria")
        .refine(
            (value) =>
                [
                    "FIET", // Facultad de Ingeniería Electrónica y Telecomunicaciones
                    "FIC", // Facultad de Ingeniería Civil
                    "FCS", // Facultad de Ciencias de la Salud
                    "FDCPS", // Facultad de Derecho y Ciencias Políticas y Sociales
                    "FACNED", // Facultad de Ciencias Naturales, Exactas y de la Educación
                    "FCH", // Facultad de Ciencias Humanas
                    "FA", // Facultad de Artes
                    "FCA", // Facultad de Ciencias Agropecuarias
                    "FCCEA", // Facultad de Ciencias Contables, Económicas y Administrativas
                ].includes(value),
            {
                message: "Seleccione una facultad válida",
            },
        ),
});

export type FormValues = z.infer<typeof formSchema>;