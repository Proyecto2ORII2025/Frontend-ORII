import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
    isSubmitting?: boolean;
    submitButtonText?: string;
    submittingText?: string;
    onCancel?: () => void;
    cancelButtonText?: string;
}

export function FormActions({
    isSubmitting = false,
    submitButtonText = "Guardar",
    submittingText = "Guardando...",
    onCancel,
    cancelButtonText = "Cancelar"
}: FormActionsProps) {
    return (
        <div className="flex gap-4 mt-6">
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-1/4"
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

            {onCancel && (
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    className="w-1/4"
                    disabled={isSubmitting}
                >
                    {cancelButtonText}
                </Button>
            )}
        </div>
    );
}