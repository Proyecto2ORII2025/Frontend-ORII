"use client";

import { AgreementsData, Agreement } from "@/types/agreementType";
import { obtainAgreements, createAgreement, updateAgreement, deleteAgreement } from "@/services/agreement.service";

interface PromiseSuccess {
    success: boolean;
    error?: string;
    field?: string;
}

export async function fetchAgreements(): Promise<AgreementsData> {
    try {
        console.log("Obteniendo los convenios...");
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
        console.log("Datos recibidos en createAgreementAction:", data);

        const response = await createAgreement(data);
        console.log("Respuesta del servicio:", response);

        return {
            success: true,
        };
    } catch (error) {
        console.error("Error detallado en createAgreementAction:", error);
        return {
            success: false
        };
    }
}

export async function editAgreementAction(data: Agreement, argumentId: string): Promise<PromiseSuccess> {
    try {
        console.log("Datos recibidos en editAgreementAction:", data);

        const response = await updateAgreement(data, argumentId);
        console.log("Respuesta del servicio:", response);

        return {
            success: true,
        };
    } catch (error) {
        console.error("Error detallado en editAgreementAction:", error);
        return {
            success: false
        };
    }

}

export async function deleteAgreementAction(agreementId: string): Promise<PromiseSuccess> {
    try {
        console.log("Eliminando convenio con id", agreementId);
        const response = await deleteAgreement(agreementId);
        console.log("Respuesta del servicio:", response);

        return {
            success: true,
        };
    } catch (error) {
        console.error("Error al eliminar convenio:", error);
        return {
            success: false
        };
    }
}