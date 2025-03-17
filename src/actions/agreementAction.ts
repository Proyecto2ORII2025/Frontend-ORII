'use server';

import { cookies } from 'next/headers';
import { obtainAgreementsServer, createAgreementServer, deleteAgreementServer } from '@/services/agreement.service';
import { AgreementsData, Agreement } from "@/types/agreementType";

interface PromiseSuccess {
    success: boolean;
    error?: string;
    field?: string;
}

export async function fetchAgreements(): Promise<AgreementsData> {
    try {
        const token = (await cookies()).get('auth-token')?.value;
        if (!token) {
            throw new Error("Token es requerido pero no se encontró.");
        }
        return await obtainAgreementsServer(token);
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
        const token = (await cookies()).get('auth-token')?.value;
        if (!token) {
            throw new Error("Token es requerido pero no se encontró.");
        }
        await createAgreementServer(data, token);
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

export async function deleteAgreementAction(id: string): Promise<PromiseSuccess> {
    try {
        const token = (await cookies()).get('auth-token')?.value;
        if (!token) {
            throw new Error("Token es requerido pero no se encontró.");
        }
        await deleteAgreementServer(id, token);
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
