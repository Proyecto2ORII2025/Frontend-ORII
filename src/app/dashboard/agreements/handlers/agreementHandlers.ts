"use client";

import { AgreementFormValues } from "@/validations/agreementSchema";
import { changeDateFormat } from "@/utils/formatChanger";
import { createAgreementAction, updateAgreementAction } from "@/actions/agreementAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAgreementHandlers(agreementId?: string) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateAgreement = async (data: AgreementFormValues) => {
        setIsSubmitting(true);
        const newAgreement = { ...data, startDate: changeDateFormat(data.startDate, true) };

        try {
            const result = await createAgreementAction(newAgreement);
            if (result.success) {
                toast.success("Convenio creado exitosamente");
                router.push("/dashboard/agreements");
                router.refresh();
            } else {
                toast.error(result.error || "Error al crear el convenio");
            }
        } catch (error) {
            console.error("Error al crear el convenio:", error);
            toast.error("Ocurrió un error al crear el convenio");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditAgreement = async (data: AgreementFormValues) => {
        if (!agreementId) return;

        setIsSubmitting(true);
        const updatedAgreement = { ...data, startDate: changeDateFormat(data.startDate, true) };

        try {
            const result = await updateAgreementAction(updatedAgreement, agreementId);
            if (result.success) {
                toast.success("Convenio actualizado exitosamente");
                window.location.reload();
            } else {
                toast.error(result.error || "Error al actualizar el convenio");
            }
        } catch (error) {
            console.error("Error al actualizar el convenio:", error);
            toast.error("Ocurrió un error al actualizar el convenio");
        } finally {
            setIsSubmitting(false);
        }
    };

    return { handleCreateAgreement, handleEditAgreement, isSubmitting };
}
