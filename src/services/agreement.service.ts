import { apiUrl } from "./env.service";
import { Agreement, AgreementsData } from "@/types/agreementType";
import authApi from "./axios.service";

const url = `${apiUrl}/agreement`;

export const getAgreements = async (): Promise<{ data: Agreement[] }> => {
    return await authApi.get(`${url}/all`);
};

export const createAgreement = async (agreement: Agreement): Promise<{ data: Agreement }> => {
    return await authApi.post(`${url}/create`, agreement);
}

export const updateAgreement = async (agreement: Agreement, agreementId: string): Promise<{ data: Agreement }> => {
    return await authApi.put(`${url}/update/${agreementId}`, agreement);
}

export const deleteAgreement = async (agreementId: string): Promise<{ data: Agreement }> => {
    return await authApi.delete(`${url}/delete/${agreementId}`);
}

// Función para obtener los acuerdos categorizados
export const obtainAgreements = async (): Promise<AgreementsData> => {
    const agreements: Agreement[] = await getAgreements()
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error cliente:", error);
            return [];
        });

    return categorizeAgreements(agreements);
};

// Función para categorizar acuerdos
function categorizeAgreements(agreements: Agreement[]): AgreementsData {
    const agreementsData: AgreementsData = {
        NATIONAL: [],
        INTERNATIONAL: [],
        ALL: [...agreements]
    };

    agreements.forEach((agreement) => {
        if (agreement.scope === "NATIONAL") {
            agreementsData.NATIONAL.push(agreement);
        } else {
            agreementsData.INTERNATIONAL.push(agreement);
        }
    });

    return agreementsData;
}