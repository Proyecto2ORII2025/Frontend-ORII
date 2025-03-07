export interface Agreement {
    agreementId: number;
    institution: string;
    agreementNumber: string;
    country: string;
    description: string;
    scope: "NATIONAL" | "INTERNATIONAL"; 
    startDate: string; 
    status: "ACTIVE" | "INACTIVE";
}

export type AgreementWithoutScope = Omit<Agreement, "scope">;