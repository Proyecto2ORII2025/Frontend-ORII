import { Button } from "@/components/ui/buttons/button";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md">
                <p className="text-lg">{message}</p>
                <div className="flex justify-end gap-4 mt-4">
                    <Button onClick={onClose} className="w-1/3 md:w-1/4 px-4" variant="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={onConfirm} className="w-1/4" type="submit">
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;