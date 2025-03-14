import axios from "./axios.service";
import { apiUrl } from "./env.service";
import { Agreement, AgreementsData } from "@/types/agreementType";

const url = `${apiUrl}/agreement`;

export const getAgreements = async (): Promise<{ data: Agreement[] }> => {
    return await axios.get(`${url}/all`);
};

export const createAgreement = async (agreement: Agreement): Promise<{ data: Agreement }> => {
    return await axios.post(`${url}/create`, agreement);
};

export const updateAgreement = async (agreement: Agreement, agreementId: string): Promise<{ data: Agreement }> => {
    return await axios.put(`${url}/update/${agreementId}`, agreement);
};

export const deleteAgreement = async (agreementId: string): Promise<{ data: { success: boolean } }> => {
    return await axios.delete(`${url}/delete/${agreementId}`);
};

export const getAgreement = async (agreementId: string): Promise<{ data: Agreement }> => {
    return await axios.get(`${url}/${agreementId}`);
};

/**
 * Obtains agreements and categorizes them into national and international.
 *
 * @async
 * @function obtainAgreements
 * @returns {Promise<AgreementsData>} An object containing categorized agreements:
 * - NATIONAL: Array of national agreements.
 * - INTERNATIONAL: Array of international agreements.
 * - ALL: Array of all agreements.
 */
export const obtainAgreements = async (): Promise<AgreementsData> => {
    const agreements: Agreement[] = await getAgreements()
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });

    const agreementsData: AgreementsData = {
        NATIONAL: [],
        INTERNATIONAL: [],
        ALL: agreements.map((agreement) => agreement)
    };

    agreements.forEach((agreement) => {
        if (agreement.scope === "NATIONAL") {
            agreementsData.NATIONAL.push(agreement);
        } else {
            agreementsData.INTERNATIONAL.push(agreement);
        }
    });

    return agreementsData;
};