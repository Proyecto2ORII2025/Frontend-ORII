"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Movility } from "@/types/movilityType";
import { MovilityForm } from "@/components/movility/movilityForm";

interface ModalEditProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedMovility: Movility) => void;
}

export default function ModalEdit({ movility, open, onClose, onUpdate }: ModalEditProps) {
  const handleSuccess = (updatedData: Movility) => {
    onUpdate(updatedData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-lg font-semibold">Editar Movilidad</DialogTitle>
        <div className="max-h-[500px] overflow-y-auto p-2">
          {movility && (
            <MovilityForm
              initialValues={movility}
              movility={movility}
              onClose={onClose}
              isEditing={true}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}