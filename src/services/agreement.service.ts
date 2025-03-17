import axios from "./axios.service";
import axiosPlain from "axios"; // Axios sin configuración para peticiones desde el servidor
import { apiUrl } from "./env.service";
import { Agreement, AgreementsData } from "@/types/agreementType";
const url = `${apiUrl}/agreement`;

// Versión que funciona en el cliente (usando axios con interceptor)
export const getAgreements = async (): Promise<{ data: Agreement[] }> => {
    return await axios.get(`${url}/all`);
};

// Versión para usar desde Server Actions (con token explícito)
export const getAgreementsServer = async (token: string): Promise<{ data: Agreement[] }> => {
    return await axiosPlain.get(`${url}/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const createAgreementServer = async (agreement: Agreement, token: string): Promise<{ data: Agreement }> => {
    return await axiosPlain.post(`${url}/create`, agreement, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateAgreement = async (agreement: Agreement, agreementId: string, token: string): Promise<{ data: Agreement }> => {
    return await axiosPlain.put(`${url}/update/${agreementId}`, agreement, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteAgreementServer = async (agreementId: string, token: string): Promise<{ data: Agreement }> => {
    return await axiosPlain.delete(`${url}/delete/${agreementId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

/**
 * Obtains agreements and categorizes them into national and international.
 * Works in client-side.
 */
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

/**
 * Obtains agreements from server side.
 * To be used in Server Actions.
 */
export const obtainAgreementsServer = async (token: string): Promise<AgreementsData> => {
    if (!token) {
        console.error("No se proporcionó token para obtainAgreementsServer");
        return {
            NATIONAL: [],
            INTERNATIONAL: [],
            ALL: []
        };
    }

    try {
        const response = await getAgreementsServer(token);
        const agreements = response.data;
        return categorizeAgreements(agreements);
    } catch (error) {
        console.error("Error servidor:", error);
        return {
            NATIONAL: [],
            INTERNATIONAL: [],
            ALL: []
        };
    }
};

// Función auxiliar para categorizar acuerdos
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