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

export const movilityTypeDict: Record<string, string> = {
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
    "TI": "Tarjeta de Identidad",
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
    setMovilityYear: (year: string) => void,
) => {
    const newEntryDateIso = e.target.value;
    const newEntryDateFormatted = formatDateToBackend(newEntryDateIso);

    setEntryDate(newEntryDateFormatted);
    setMovilityYear(new Date(newEntryDateIso).getFullYear().toString());

    setExitDate(""); 
    setStayDays(0);

    const exitDateInput = document.getElementById("exitDate") as HTMLInputElement;
    if (exitDateInput) {
        exitDateInput.min = newEntryDateIso;
    }

    if (exitDate) {
        const exitDateIso = formatDateToInput(exitDate);
        calculateStayDays(newEntryDateIso, exitDateIso, setStayDays);
    }
};

export const handleExitDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    entryDate: string,
    setExitDate: (date: string) => void,
    setStayDays: (days: number) => void,
) => {
    const newExitDateIso = e.target.value;
    const newExitDateFormatted = formatDateToBackend(newExitDateIso);

    setExitDate(newExitDateFormatted);

    if (entryDate) {
        const entryDateIso = formatDateToInput(entryDate);
        calculateStayDays(entryDateIso, newExitDateIso, setStayDays);
    }
};

const calculateStayDays = (
    startDateIso: string,
    endDateIso: string,
    setStayDays: (days: number) => void
) => {
    if (!startDateIso || !endDateIso) {
        setStayDays(0);
        return;
    }

    const start = new Date(startDateIso);
    const end = new Date(endDateIso);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let diffDays = 0;
    if (end >= start) {
        const diffTime = end.getTime() - start.getTime();
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    }

    setStayDays(diffDays);
};