"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgreementProps, AgreementTableProps } from "@/types/agreementType";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/modal";
import React, { useState, useEffect } from "react";
import { deleteAgreementAction } from "@/actions/agreementAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AgreementTable({
    agreements,
    isLoading,
    emptyMessage,
    columns
}: AgreementTableProps) {
    const router = useRouter();
    const [localAgreements, setLocalAgreements] = useState<AgreementProps[]>(agreements);
    const [selectedAgreement, setSelectedAgreement] = React.useState<AgreementProps | null>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        setLocalAgreements(agreements);
    }, [agreements]);

    const handleOpenDeleteModal = (agreement: AgreementProps) => {
        setSelectedAgreement(agreement);
        onOpen();
    };

    const handleDelete = async () => {
        if (!selectedAgreement) return;

        try {
            setDeleteLoading(true);
            const result = await deleteAgreementAction(selectedAgreement.agreementId.toString());

            if (result.success) {
                setLocalAgreements(prevAgreements =>
                    prevAgreements.filter(a => a.agreementId !== selectedAgreement.agreementId)
                );
                toast.success("Convenio eliminado exitosamente");
                onClose(); // Cierra el modal después de eliminar
                router.refresh();
            } else {
                toast.error(result.error || "No se pudo eliminar el convenio");
            }
        } catch (error) {
            console.error("Error al eliminar el convenio:", error);
            toast.error("Ocurrió un error al eliminar el convenio");
        } finally {
            setDeleteLoading(false);
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>;
            case "INACTIVE":
                return <Badge className="bg-red-500 hover:bg-red-600">Inactivo</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-blue" />
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
                <thead className="bg-muted">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue"
                            >
                                {column.header}
                            </th>
                        ))}
                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {localAgreements.length > 0 ? (
                        localAgreements.map((agreement) => (
                            <tr key={agreement.agreementId} className="hover:bg-muted/50">
                                {columns.map((column) => (
                                    <td
                                        key={`${agreement.agreementId}-${String(column.key)}`}
                                        className={column.key === 'description' ? "px-4 py-3 max-w-xs truncate" : "px-4 py-3"}
                                        title={column.key === 'description' ? String(agreement.description) : undefined}
                                    >
                                        {column.key === 'status'
                                            ? getStatusBadge(String(agreement.status))
                                            : String(agreement[column.key])}
                                    </td>
                                ))}
                                <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none">
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            onClick={() => handleOpenDeleteModal(agreement)}
                                            variant="outline"
                                            size="sm"
                                            className="bg-redLight/40 text-redLight hover:text-white hover:bg-redLight border-none"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="px-4 py-3 text-center">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Eliminar convenio
                            </ModalHeader>
                            <ModalBody>
                                {selectedAgreement && (
                                    <p>
                                        ¿Está seguro que desea eliminar el convenio{" "}
                                        <strong>{selectedAgreement.agreementNumber}</strong>?
                                    </p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="secondaryWithoutHover"
                                    onClick={onClose}
                                    disabled={deleteLoading}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="delete"
                                    onClick={handleDelete}
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Eliminando...
                                        </>
                                    ) : (
                                        'Eliminar'
                                    )}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}