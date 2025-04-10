export const CTADict: Record<string, string> = {
    "1": "Periodo 1",
    "2": "Periodo 2"
}

export const scopeDict: Record<string, string> = {
    "Nacional": "Nacional",
    "Internacional": "Internacional",
  };

export const genderDict: Record<string, string> = {
    "M": "Masculino",
    "F": "Femenino",
};

export const roleDict: Record<string, string> = {
    STUDENT: "Estudiante",
    TEACHER: "Docente",
    ADMIN: "Administrativo",
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

export const eventTypeDict: Record<string, string> = {
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
    { label: "Estancia o pasantía de investigación", value: "4" },
    { label: "Semestre académico de intercambio", value: "5" },
    { label: "Rotación médica", value: "6" },
    { label: "Profesor visitante o saliente", value: "7" },
    { label: "Voluntariado", value: "8" },
];

export const eventDescriptions = {
    0: "En base al evento escogido en el campo 'Tipo de evento', agrega lo solicitado para el tipo de evento.",
    1: 'Puede ser congreso, taller, seminario, simposio. Agrega el nombre del evento.',
    2: 'Agrega una descripción resumida.',
    3: 'Agrega una descripción resumida.',
    4: 'Agrega una descripción resumida.',
    5: 'Semestre de intercambio, Opción trabajo de grado en la modalidad profundización, Internado Rotatorio, debe especificar.',
    6: 'Nombre de la Rotación',
    7: 'Agrega una breve descripción de las actividades que realizará.',
    8: 'Descripción de las actividades a desarrollar durante el tiempo autorizado para el Voluntariado.',
};

export const documentTypeDict: Record<string, string> = {
    "TI": "Tarjeta de identidad",
    "CC": "Cédula de Ciudadanía",
    "CE": "Cédula de Extranjería",
    "PS": "Pasaporte",
    "V": "Visa",
    "OT": "Otro",
};





export interface FilterState {
    facultad?: string;
    programa?: string;
    tipo?: string;
    ambito?: string;
}

export interface MovilityProps {
    id: number;
    title: string;
    institution: string;
    type: string;
    ambito: string;
    facultad: string;
    programa: string;
    fechaInicio?: string;
    fechaFin?: string;
    estado?: string;
}





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

export const validateFields = (fields: MovilityFields) => {
    const newErrors: Record<string, string> = {};
    if (!fields.firstName) newErrors.firstName = "El nombre es obligatorio.";
    if (!fields.lastName) newErrors.lastName = "Los apellidos son obligatorios.";
    if (!fields.gender) newErrors.gender = "El género es obligatorio.";
    if (!fields.personType) newErrors.personType = "El rol es obligatorio.";
    if (!fields.identificationType) newErrors.identificationType = "El tipo de documento es obligatorio.";
    if (!fields.identification) newErrors.identification = "El número de documento es obligatorio.";
    if (!fields.direction) newErrors.direction = "El tipo de movilidad es obligatorio.";
    if (!fields.faculty) newErrors.faculty = "La facultad es obligatoria.";
    if (!fields.eventTypeId) newErrors.eventTypeId = "El tipo de evento es obligatorio.";
    if (!fields.description) newErrors.description = "La descripción del evento es obligatoria.";
    if (!fields.cta) newErrors.cta = "El periodo es obligatorio.";
    if (!fields.origin) newErrors.origin = "La universidad de origen es obligatoria.";
    if (!fields.destination) newErrors.destination = "La universidad de destino es obligatoria.";
    if (!fields.country) newErrors.country = "El país es obligatorio.";
    if (!fields.city) newErrors.city = "La ciudad es obligatoria.";
    if (!fields.originProgram) newErrors.originProgram = "El programa de origen es obligatorio.";
    if (!fields.destinationProgram) newErrors.destinationProgram = "El programa de acogida es obligatorio.";
    if (!fields.entryDate) newErrors.entryDate = "La fecha de entrada es obligatoria.";
    if (!fields.exitDate) newErrors.exitDate = "La fecha de salida es obligatoria.";
    if (!fields.agreement) newErrors.agreement = "Debe indicar si existe un convenio.";
    if (fields.agreement === "Y" && !fields.agreementId) {
        console.log("agreement:", fields.agreement);  // Verifica que es "Y"
        console.log("agreementId:", fields.agreementId);  // Debería ser undefined o vacío
        newErrors.agreementId = "El número de convenio es obligatorio.";
    }
    if (!fields.funding) newErrors.funding = "El valor de la financiación es obligatorio.";
    if (!fields.fundingSource) newErrors.fundingSource = "La fuente de la financiación es obligatoria.";
    const isIncomingMovility = fields.direction === "INCOMING_IN_PERSON" || fields.direction === "INCOMING_VIRTUAL";
    const isStudent = fields.personType === "STUDENT";
    if (isIncomingMovility && isStudent && !fields.teacher) {
        newErrors.teacher = "El tutor académico es obligatorio para estudiantes en movilidad entrante";
    }
    console.log("Errores antes de retornar:", newErrors);

    return newErrors;
};

export const formatDateToBackend = (isoDate: string): string => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
};


export const formatDateToInput = (backendDate: string): string => {
    if (!backendDate) return "";
    const [day, month, year] = backendDate.split("-");
    return `${year}-${month}-${day}`;
};

export const handleEntryDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEntryDate: (date: string) => void,
    exitDate: string,
    setExitDate: (date: string) => void,
    setStayDays: (days: number) => void,
    setMovilityYear: (year: string) => void
) => {
    const newEntryDateIso = e.target.value; // Formato YYYY-MM-DD
    const newEntryDateFormatted = formatDateToBackend(newEntryDateIso); // Convertir a DD-MM-YYYY

    setEntryDate(newEntryDateFormatted); // Guardar en estado (formato backend)
    setMovilityYear(new Date(newEntryDateIso).getFullYear().toString());

    // Bloquear fechas anteriores en el input de salida
    const exitDateInput = document.getElementById("exitDate") as HTMLInputElement;
    if (exitDateInput) exitDateInput.min = newEntryDateIso;

    // Recalcular días si hay fecha de salida
    if (exitDate) {
        const exitDateIso = formatDateToInput(exitDate); // Convertir exitDate a ISO para cálculo
        const start = new Date(newEntryDateIso).getTime();
        const end = new Date(exitDateIso).getTime();
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setStayDays(diffDays > 0 ? diffDays : 0);
    }
};

export const handleExitDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    entryDate: string,
    setExitDate: (date: string) => void,
    setStayDays: (days: number) => void
) => {
    const newExitDateIso = e.target.value; // Formato YYYY-MM-DD
    const newExitDateFormatted = formatDateToBackend(newExitDateIso); // Convertir a DD-MM-YYYY

    setExitDate(newExitDateFormatted); // Guardar en estado (formato backend)

    // Calcular días de estadía
    if (entryDate) {
        const entryDateIso = formatDateToInput(entryDate); // Convertir entryDate a ISO para cálculo
        const start = new Date(entryDateIso).getTime();
        const end = new Date(newExitDateIso).getTime();
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setStayDays(diffDays > 0 ? diffDays : 0);
    }
};