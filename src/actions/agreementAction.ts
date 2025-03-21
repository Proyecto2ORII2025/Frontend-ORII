'use server';

import { obtainAgreements, createAgreement, deleteAgreement, updateAgreement } from '@/services/agreement.service';
import { AgreementsData, Agreement } from "@/types/agreementType";

interface PromiseSuccess {
    success: boolean;
    error?: string;
    field?: string;
}

export async function fetchAgreements(): Promise<AgreementsData> {
    try {
        return await obtainAgreements();
    } catch (error) {
        console.error("Error al obtener los convenios:", error);
        return {
            NATIONAL: [],
            INTERNATIONAL: [],
            ALL: []
        };
    }
}

export async function createAgreementAction(data: Agreement): Promise<PromiseSuccess> {
    try {
        await createAgreement(data);
        return {
            success: true,
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false
        };
    }
}

export async function updateAgreementAction(data: Agreement, id: string | undefined): Promise<PromiseSuccess> {
    try {
        if (!id) {
            return {
                success: false,
                error: "No se ha proporcionado un identificador para actualizar el convenio"
            };
        }

        await updateAgreement(data, id);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false
        };
    }
}

export async function deleteAgreementAction(id: string): Promise<PromiseSuccess> {
    try {
        await deleteAgreement(id);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            success: false
        };
    }
}
