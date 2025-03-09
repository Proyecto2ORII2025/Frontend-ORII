export type Agreement = {
    agreementId: number;
    institution: string;
    agreementNumber: string;
    country: string;
    description: string;
    scope: "NATIONAL" | "INTERNATIONAL"; 
    startDate: string; 
    status: "ACTIVE" | "INACTIVE";
}

export type AgreementForPost = Omit<Agreement, "agreementId" | "status">;

export type FilteredAgreements = {
    national: Agreement[];
    international: Agreement[];
}

