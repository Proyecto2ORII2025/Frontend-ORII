import { Column } from "@/types/agreementType";

export const columns: Column[] = [
    { key: "agreementNumber", header: "Código" },
    { key: "country", header: "País" },
    { key: "institution", header: "Institución" },
    { key: "description", header: "Descripción" },
    { key: "startDate", header: "Fecha de inicio" },
    { key: "status", header: "Estado" },
];