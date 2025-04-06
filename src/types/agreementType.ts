// Definición de interfaces

import { FilterState } from "./filterAgreementType";

export interface Agreement {
    id?: string;
    scope: 'NATIONAL' | 'INTERNATIONAL';
}

export interface AgreementsData {
    NATIONAL: Agreement[];
    INTERNATIONAL: Agreement[];
    ALL: Agreement[];
}

export interface AgreementProps {
    agreementId?: string;
    agreementNumber: string;
    institution: string;
    description: string;
    country: string;
    startDate: string;
    scope: "NATIONAL" | "INTERNATIONAL";
    status: "ACTIVE" | "INACTIVE";
}

// Interfaces para componentes

export interface AgreementHeaderProps {
    title: string;
    description?: string;
    onSearch?: (value: string) => void;
    onFilter?: (filterType: string, value?: string) => void;
    searchTerm?: string;
    activeFilters?: FilterState;
    agreements: AgreementProps[]
}

export interface AgreementTableProps {
    agreements: AgreementProps[];
    isLoading: boolean;
    emptyMessage: string;
    columns: Column[];
}

export interface Column {
    key: keyof AgreementProps;
    header: string;
}

export interface CreateAgreementProps {
    agreement?: AgreementProps | null;
    onCloseU?: () => void;
}

export const columns: Column[] = [
    { key: "agreementNumber", header: "Código" },
    { key: "country", header: "País" },
    { key: "institution", header: "Institución" },
    { key: "description", header: "Descripción" },
    { key: "startDate", header: "Fecha de inicio" },
    { key: "status", header: "Estado" },
];
