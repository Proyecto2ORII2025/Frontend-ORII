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

export const YearFilter = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
];

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
    "Ingeniería de Sistemas",
    "Ingeniería Civil",
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