"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Title from "@/components/ui/title";
import AgreementForm from "@/components/agreement/agreementForm";
import { createAgreementAction } from "@/actions/agreementAction";
import { AgreementFormValues } from "@/validations/agreementSchema";

export default function CreateAgreement() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateAgreement = async (data: AgreementFormValues) => {
        setIsSubmitting(true);

        try {
            const result = await createAgreementAction(data);

            if (result.success) {
                toast.success("Convenio creado exitosamente");
                router.push("/dashboard/agreements"); // Redirigir a la lista de convenios
                router.refresh(); // Actualizar los datos en la página
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

    return (
        <>
            <div className="mb-8">
                <Title title="Crear convenio" />
                <p className="text-muted-foreground mt-2">
                    A continuación podrá crear un convenio. Por favor verifique que la información ingresada es correcta e ingrese
                    todos los campos.
                </p>
            </div>

            <AgreementForm
                onSubmit={handleCreateAgreement}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
            />
        </>
    );
}