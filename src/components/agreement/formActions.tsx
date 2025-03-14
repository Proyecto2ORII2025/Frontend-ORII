"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
    isSubmitting: boolean;
    onCancel: () => void;
    submitButtonText?: string;
    submittingText?: string;
}

export const FormActions = ({
    isSubmitting,
    onCancel,
    submitButtonText = "Crear Convenio",
    submittingText = "Creando...",
}: FormActionsProps) => {
    return (
        <div className="flex justify-start space-x-4">
            <Button
                className="w-1/4"
                variant="secondary"
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
            >
                Cancelar
            </Button>
            <Button
                className="w-1/3 md:w-1/4 px-4"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {submittingText}
                    </>
                ) : (
                    submitButtonText
                )}
            </Button>
        </div>
    );
};