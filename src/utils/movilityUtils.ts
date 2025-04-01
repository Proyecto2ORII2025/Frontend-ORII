export const CTADict: Record<string, string> = {
    "1": "Periodo 1",
    "2": "Periodo 2"
}

export const genderDict: Record<string, string> = {
    "M": "Masculino",
    "F": "Femenino",
  };

export const roleDict: Record<string, string> = {
    STUDENT: "Estudiante",
    TEACHER: "Docente",
    ADMIN: "Administrativo",
  };

export const documentTypeDict: Record<string, string> = {
    "TI": "Tarjeta de identidad",
    "CC": "Cédula de Ciudadanía",
    "CE": "Cédula de Extranjería",
    "PS": "Pasaporte",
    "V": "Visa",
    "OT": "Otro",
  };

export const mobilityTypeDict: Record<string, string> = {
    "INCOMING_IN_PERSON": "Entrante en persona",
    "OUTGOING_IN_PERSON": "Saliente en persona",
    "INCOMING_VIRTUAL": "Entrante virtual",
    "OUTGOING_VIRTUAL": "Saliente virtual",
  };

export const facultyDict: Record<string, string> = {
    FA: "Facultad de Artes",
    FCA: "Facultad de Ciencias Agrarias",
    FCS: "Facultad de Ciencias de la Salud",
    FCCEA: "Facultad de Ciencias Contables, Económicas y Administrativas",
    FCH: "Facultad de Ciencias Humanas",
    FACNED: "Facultad de Ciencias Naturales, Exactas y de la Educación",
    FDCPS: "Facultad de Derecho, Ciencias Políticas y Sociales",
    FIC: "Facultad de Ingeniería Civil",
    FIET: "Facultad de Ingeniería Electrónica y Telecomunicaciones",
  };

export const eventTypeDict: Record<string, string>  = {
    "1": "Asistencia a evento",
    "2": "Misión",
    "3": "Curso corto",
    "4": "Estancia o pasantía de investigación",
    "5": "Intercambio",
    "6": "Rotación médica",
    "7": "Profesor visitante o saliente",
    "8": "Voluntariado",
  };

export const options = [
    { label: "Asistencia a evento", value: "1" },
    { label: "Misión", value: "2" },
    { label: "Curso corto", value: "3" },
    { label: "Estancia de investigación", value: "4" },
    { label: "Semestre académico de intercambio", value: "5" },
    { label: "Doble titulación", value: "6" },
    { label: "Pasantía o práctica", value: "7" },
    { label: "Rotación médica", value: "8" },
    { label: "Profesor visitante", value: "9" },
    { label: "Profesor de programa de pregrado", value: "10" },
    { label: "Profesor de programa de especialización", value: "11" },
    { label: "Profesor de programa de maestría", value: "12" },
    { label: "Profesor de programa de doctorado", value: "13" },
    { label: "Profesor de programa de postdoctorado", value: "14" },
    { label: "Estudios de maestría", value: "15" },
    { label: "Estudios de doctorado", value: "16" },
    { label: "Estudios de posdoctorado", value: "17" },
    { label: "Internacionalización en casa", value: "18" },
    { label: "Voluntariado", value: "19" },
];

export const eventDescriptions = {
    0: "En base al evento escogido en el campo 'Tipo de evento', agrega lo solicitado para el tipo de evento.",
    1: 'Puede ser congreso, taller, seminario, simposio. Agrega el nombre del evento.',
    2: 'Agrega una descripción resumida.',
    3: 'Agrega una descripción resumida.',
    4: 'Agrega una descripción resumida.',
    5: 'Semestre de intercambio, Opción trabajo de grado en la modalidad profundización, Internado Rotatorio, debe especificar.',
    6: 'Agrega una descripción resumida.',
    7: 'Agrega una descripción resumida.',
    8: 'Nombre de la Rotación.',
    9: 'Agrega una breve descripción de las actividades que orientará o realizará.',
    10: 'Indica el nombre del programa y agrega una breve descripción.',
    11: 'Indica el nombre del programa y agrega una breve descripción.',
    12: 'Indica el nombre del programa y agrega una breve descripción.',
    13: 'Indica el nombre del programa y agrega una breve descripción.',
    14: 'Indica el nombre del programa y agrega una breve descripción.',
    15: 'Indica el nombre del programa y agrega una breve descripción.',
    16: 'Indica el nombre del programa y agrega una breve descripción.',
    17: 'Indica el nombre del programa y agrega una breve descripción.',
    18: 'Agrega una descripción resumida.',
    19: 'Descripción de las actividades a desarrollar durante el tiempo autorizado para el Voluntariado.',
};

interface MovilityFields {
    firstName?: string;
    lastName?: string;
    gender?: string;
    personType?: string;
    identificationType?: string;
    identification?: string;
    email?: string;
    movilityType?: string;
    faculty?: string;
    eventTypeId?: number;
    description?: string;
    movilityScope?: string;
    origin?: string;
    destination?: string;
    country?: string;
    city?: string;
    originProgram?: string;
    destinationProgram?: string;
    teacher?: string;
    agreement?: string;
    numberAgreement?: number;
    valorFinanciacion?: string;
    fundingSource?: string;
    entryDate?: string;
    exitDate?: string;
    stayDays?: number;
    movilityYear?: string;
}

export const validateFields = (fields: MovilityFields) => {
    const newErrors: Record<string, string> = {};
    if (!fields.firstName) newErrors.firstName = "El nombre es obligatorio.";
    if (!fields.lastName) newErrors.lastName = "Los apellidos son obligatorios.";
    if (!fields.gender) newErrors.gender = "El género es obligatorio.";
    if (!fields.personType) newErrors.personType = "El rol es obligatorio.";
    if (!fields.identificationType) newErrors.identificationType = "El tipo de documento es obligatorio.";
    if (!fields.identification) newErrors.identification = "El número de documento es obligatorio.";
    if (!fields.movilityType) newErrors.movilityType = "El tipo de movilidad es obligatorio.";
    if (!fields.faculty) newErrors.faculty = "La facultad es obligatoria.";
    if (!fields.eventTypeId) newErrors.eventTypeId = "El tipo de evento es obligatorio.";
    if (!fields.description) newErrors.description = "La descripción del evento es obligatoria.";
    if (!fields.movilityScope) newErrors.movilityScope = "El ámbito es obligatorio.";
    if (!fields.origin) newErrors.origin = "La universidad de origen es obligatoria.";
    if (!fields.destination) newErrors.destination = "La universidad de destino es obligatoria.";
    if (!fields.country) newErrors.country = "El país es obligatorio.";
    if (!fields.city) newErrors.city = "La ciudad es obligatoria.";
    if (!fields.originProgram) newErrors.originProgram = "El programa de origen es obligatorio.";
    if (!fields.destinationProgram) newErrors.destinationProgram = "El programa de acogida es obligatorio.";
    if (!fields.entryDate) newErrors.entryDate = "La fecha de entrada es obligatoria.";
    if (!fields.exitDate) newErrors.exitDate = "La fecha de salida es obligatoria.";
    if (!fields.agreement) newErrors.agreement = "Debe indicar si existe un convenio.";
    if (fields.agreement === "Y" && !fields.numberAgreement) newErrors.numberAgreement = "El número de convenio es obligatorio.";
    if (!fields.valorFinanciacion) newErrors.valorFinanciacion = "El valor de la financiación es obligatorio.";
    if (!fields.fundingSource) newErrors.fundingSource = "La fuente de la financiación es obligatoria.";
    const isIncomingMovility = fields.movilityType === "INCOMING_IN_PERSON" || fields.movilityType === "INCOMING_VIRTUAL";
    const isStudent = fields.personType === "STUDENT";
    const isRelevantEventType = [4, 5, 7].includes(fields.eventTypeId || 0); // Tipos de evento 4, 5 o 7
    if (isIncomingMovility && isStudent && isRelevantEventType && !fields.teacher) {
        newErrors.teacher = "El tutor académico es obligatorio para estudiantes en movilidad entrante con los tipos de evento 4, 5 o 7.";
    }
    return newErrors;
};

export const handleEntryDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEntryDate: (date: string) => void,
    exitDate: string,
    setExitDate: (date: string) => void,
    setStayDays: (days: number) => void,
    setMovilityYear: (year: string) => void
) => {
    const newEntryDate = e.target.value;
    setEntryDate(newEntryDate);

    const year = new Date(newEntryDate).getFullYear().toString();
    setMovilityYear(year);

    const exitDateInput = document.getElementById("exitDate") as HTMLInputElement;
    if (exitDateInput) {
        exitDateInput.min = newEntryDate;
    }

    if (exitDate && new Date(exitDate) < new Date(newEntryDate)) {
        setExitDate("");
        setStayDays(0);
    } else if (exitDate) {
        const start = new Date(newEntryDate).getTime();
        const end = new Date(exitDate).getTime();
        const diffTime = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setStayDays(diffTime);
    }
};

export const handleExitDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    entryDate: string,
    setExitDate: (date: string) => void,
    setStayDays: (days: number) => void
) => {
    const newExitDate = e.target.value;
    setExitDate(newExitDate);

    if (entryDate && newExitDate) {
        const start = new Date(entryDate).getTime();
        const end = new Date(newExitDate).getTime();

        if (end > start) {
            const diffTime = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setStayDays(diffTime);
        } else {
            setStayDays(0);
        }
    } else {
        setStayDays(0);
    }
};
