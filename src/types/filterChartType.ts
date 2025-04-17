export interface FilterState {
    year?: string; 
    month?: string; 
    program?: string; 
    faculty?: string;
    semester?: string; 
};

export interface FilterSelectorProps {
    filterName: string;
    filterValues: string[];
    activeValue?: string;
    onSelect: (value: string) => void;
    onRemove: () => void;
}

export const YearFilter = Array.from({ length: 6 }, (_, i) => (new Date().getFullYear() - i).toString());

export const MonthFilter = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export const ProgramFilter = [
    "Artes Plásticas",
    "Diseño Gráfico",
    "Dirección de Banda",
    "Licenciatura en Música",
    "Música Instrumental",
    "Ingeniería Agroindustrial",
    "Ingeniería Agropecuaria",
    "Ingeniería Forestal",
    "Tecnología Agroindustrial",
    "Tecnología en Gestión de Proyectos Agroecológicos",
    "Ingeniería en Agroecología",
    "Enfermería",
    "Fisioterapia",
    "Fonoaudiología",
    "Medicina",
    "Administración de Empresas",
    "Contaduría Pública",
    "Economía",
    "Turismo",
    "Contaduría Pública (Santander de Quilichao)",
    "Tecnología en Gestión del Territorio y Organizaciones",
    "Gestión Territorial y Economía Social y Solidaria",
    "Antropología",
    "Filosofía",
    "Geografía del Desarrollo Regional y Ambiental",
    "Historia",
    "Licenciatura en Lenguas Modernas con Énfasis en Inglés y Francés",
    "Licenciatura en Etnoeducación",
    "Licenciatura en Lingüística y Semiótica",
    "Licenciatura en Literatura y Lengua Castellana",
    "Biología",
    "Ingeniería Física",
    "Licenciatura en Ciencias Naturales y Educación Ambiental",
    "Licenciatura en Educación Artística",
    "Licenciatura en Educación Básica Primaria",
    "Licenciatura en Educación Física, Recreación y Deportes",
    "Licenciatura en Matemáticas",
    "Matemáticas",
    "Química",
    "Tecnología en Gestión Ambiental",
    "Ciencia Política",
    "Comunicación Social",
    "Derecho",
    "Derecho (Santander de Quilichao)",
    "Arquitectura",
    "Ingeniería Civil",
    "Ingeniería Ambiental",
    "Geotecnología",
    "Ingeniería Civil (Santander de Quilichao)",
    "Ingeniería Electrónica y Telecomunicaciones",
    "Ingeniería de Sistemas",
    "Ingeniería en Automática Industrial",
    "Tecnología en Telemática",
];


export const FacultyFilter = [
    "Facultad de Artes",
    "Facultad de Ciencias Agrarias",
    "Facultad de Ciencias de la Salud",
    "Facultad de Ciencias Contables, Económicas y Administrativas",
    "Facultad de Ciencias Humanas",
    "Facultad de Ciencias Naturales, Exactas y de la Educación",
    "Facultad de Derecho, Ciencias Políticas y Sociales",
    "Facultad de Ingeniería Civil",
    "Facultad de Ingeniería Electrónica y Telecomunicaciones",
];

export const SemesterFilter = [
    "Semestre 1",
    "Semestre 2",
];

export const filterNames = [
    "Año",
    "Mes",
    "Programa",
    "Facultad",
    "Semestre",
];

export const filterOptions = {
    year: YearFilter,
    month: MonthFilter,
    program: ProgramFilter,
    faculty: FacultyFilter,
    semester: SemesterFilter,
};