import axios from './axios.service';
import { Agreement, AgreementForPost, FilteredAgreements } from '../app/dashboard/agreements/types/agreementsTypes';

const url = "/agreement";

async function getAgreements(): Promise<Agreement[]> {
    try {
        const res = await axios.get<Agreement[]>(`${url}/all`);
        return res.data;
    } catch (err) {
        console.error("Error en getAgreements:", err);
        return [];
    }
}

export async function getAgreement(agreementId: number): Promise<Agreement | undefined> {
    try {
        const agreements = await getAgreements();

        const agreement = agreements.find(a => a.agreementId === agreementId);

        if (!agreement) {
            console.error(`No se encontró el acuerdo con ID ${agreementId}`);
            return undefined;
        }

        return agreement;
    } catch (err) {
        console.error("Error en getAgreement:", err);
        return undefined;
    }
}

export async function putAgreement(agreement: Agreement): Promise<Agreement | undefined> {
    try {
        const res = await axios.put(`${url}/update/${agreement.agreementId}`, agreement);
        return res.data;
    } catch (err) {
        console.error("Error en putAgreement:", err);
    }
}

export async function postAgreement(agreement: AgreementForPost): Promise<Agreement | undefined> {
    try {
        const res = await axios.post(`${url}/create`, agreement);
        return res.data;
    } catch (err) {
        console.error("Error en postAgreement:", err);
    }
}

export async function deleteAgrement(agreementId: number): Promise<void> {
    try {
        await axios.delete(`${url}/delete/${agreementId}`);
    } catch (err) {
        console.error("Error en deleteAgrement:", err);
    }
}

export async function getFilteredAgreements(): Promise<FilteredAgreements> {
    const agreements = await getAgreements();

    const national = agreements
        .filter(agreement => agreement.scope === "NATIONAL")

    const international = agreements
        .filter(agreement => agreement.scope === "INTERNATIONAL")

    return { national, international };
}


