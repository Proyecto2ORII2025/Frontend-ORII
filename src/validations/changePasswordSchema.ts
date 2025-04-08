import { z } from "zod";

export const changePasswordSchema = z.object({

    currentPassword: z.
            string().
            min(1, "La contraseña actual es obligatoria"),

    newPassword: z
        .string()
        .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/\d/, "Debe contener al menos un número")
        .regex(/[@$!%*?&]/, "Debe contener al menos un símbolo especial"),

    confirmPassword: z.
        string().
        min(1, "La confirmación es obligatoria"),

}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
});