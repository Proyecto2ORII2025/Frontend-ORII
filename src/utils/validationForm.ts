interface MovilityFields {
    firstName?: string;
    lastName?: string;
    gender?: string;
    cta?: number;
    personType?: string;
    identificationType?: string;
    identification?: string;
    email?: string;
    direction?: string;
    faculty?: string;
    eventTypeId?: number;
    description?: string;
    origin?: string;
    destination?: string;
    country?: string;
    city?: string;
    originProgram?: string;
    destinationProgram?: string;
    teacher?: string;
    agreement?: string;
    agreementId?: number;
    funding?: string;
    fundingSource?: string;
    entryDate?: string;
    exitDate?: string;
    stayDays?: number;
    movilityYear?: string;
}

interface FieldValidation {
    required?: boolean;
    pattern?: RegExp;
    customValidator?: (value: unknown, fields?: MovilityFields) => string | null;
}

const fieldValidations: Record<keyof MovilityFields, FieldValidation> = {
    firstName: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    lastName: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    gender: { required: true },
    cta: { required: true },
    personType: { required: true },
    identificationType: { required: true },
    identification: {
        required: true,
        pattern: /^[0-9]+$/,
    },
    email: {
        required: true,
        customValidator: (value: unknown) => {
            if (typeof value !== 'string') {
                return "El correo debe ser una cadena de texto";
            }
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "El correo electrónico debe ser válido (debe contener @ y dominio)";
            }
            return null;
        }
    },
    direction: { required: true },
    faculty: { required: true },
    eventTypeId: { required: true },
    description: { required: true },
    origin: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    destination: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    country: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    city: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    originProgram: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    destinationProgram: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    teacher: {
        required: false,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    agreement: { required: true },
    agreementId: {
        required: false,
        customValidator: (value: unknown, fields?: MovilityFields) =>
            fields?.agreement === "Y" && !value ? "El número de convenio es obligatorio." : null
    },
    funding: {
        required: true,
        customValidator: (value: unknown) => {
            if (isNaN(Number(value))) {
                return "El valor de financiación debe ser un número";
            }
            if (Number(value) < 0) {
                return "La financiación no puede ser negativa";
            }
            return null;
        }
    },
    fundingSource: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    entryDate: { required: true },
    exitDate: { required: true },
    stayDays: { required: false },
    movilityYear: { required: false },
};

export const validateFields = (fields: MovilityFields) => {
    const newErrors: Record<string, string> = {};

    for (const [fieldName, validation] of Object.entries(fieldValidations)) {
        const value = fields[fieldName as keyof MovilityFields];

        if (validation.required && !value) {
            newErrors[fieldName] = `El campo es obligatorio.`;
            continue;
        }

        if (value && validation.pattern && !validation.pattern.test(String(value))) {
            newErrors[fieldName] = `Contiene caracteres inválidos.`;
            continue;
        }

        if (validation.customValidator) {
            // Pasamos fields solo si el validador lo necesita
            const customError = validation.customValidator(value, fields);
            if (customError) {
                newErrors[fieldName] = customError;
            }
        }
    }

    // Validación condicional del tutor académico
    const isStudent = fields.personType === "STUDENT";
    if (isStudent && !fields.teacher) {
        newErrors.teacher = "El tutor académico es obligatorio para estudiantes";
    }

    return newErrors;
};