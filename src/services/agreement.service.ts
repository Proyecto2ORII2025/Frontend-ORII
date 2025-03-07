import axios from './axios.service';
import { Agreement, AgreementWithoutScope } from '../app/dashboard/agreements/types/requestApiTypes';

interface FilteredAgreements {
    national: AgreementWithoutScope[];
    international: AgreementWithoutScope[];
}

const url = "/agreement";

async function getAgreements(): Promise<Agreement[]> {
    try {
        const response = await axios.get<Agreement[]>(`${url}/all`);
        return response.data;
    } catch (err) {
        console.error("Error en getAgreements:", err);
        return [];
    }
}

export async function getFilteredAgreements(): Promise<FilteredAgreements> {
    const agreements = await getAgreements();

    const national = agreements
        .filter(agreement => agreement.scope === "NATIONAL")
        .map(agreement => agreement as Omit<Agreement, 'scope'>);

    const international = agreements
        .filter(agreement => agreement.scope === "INTERNATIONAL")
        .map(agreement => agreement as Omit<Agreement, 'scope'>);

    return { national, international };
}
