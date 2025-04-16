"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Movility } from "@/types/movilityType";
import { MovilityForm } from "@/components/movility/movilityForm";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalEditProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedMovility: Movility) => void;
}

export default function ModalEdit({ movility, open, onClose, onUpdate }: ModalEditProps) {
  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent 
        className="max-w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()} // Bloquea clic fuera
        onEscapeKeyDown={(e) => e.preventDefault()}    // Bloquea tecla ESC
      >
        <div className="flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">Editar Movilidad</DialogTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[500px] overflow-y-auto p-2">
          {movility && (
            <MovilityForm
              initialValues={movility}
              movility={movility}
              onClose={onClose}
              isEditing={true}
              onSuccess={(updatedData) => {
                onUpdate(updatedData);
                onClose();
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}