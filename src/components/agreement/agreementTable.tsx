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
import AgreementForm from "./agreementForm";
import Title from "@/components/ui/title";

export default function AgreementTable({
    agreements,
    isLoading,
    emptyMessage,
    columns,
}: AgreementTableProps) {

    const router = useRouter();

    const [localAgreements, setLocalAgreements] =
        useState<AgreementProps[]>(agreements);

    const [selectedAgreement, setSelectedAgreement] =
        React.useState<AgreementProps | null>(null);

    useEffect(() => {
        setLocalAgreements(agreements);
    }, [agreements]);

    const {
        isOpen: isOpenD,
        onOpen: onOpenD,
        onOpenChange: onOpenChangeD,
        onClose: onCloseD,
    } = useDisclosure(); // Modal de eliminar (D de Delete)
    const {
        isOpen: isOpenU,
        onOpen: onOpenU,
        onOpenChange: onOpenChangeU,
        onClose: onCloseU,
    } = useDisclosure(); // Modal de editar (U de Update)

    const handleOpenDeleteModal = (agreement: AgreementProps) => {
        setSelectedAgreement(agreement);
        onOpenD();
    };

    const handleOpenEditModal = (agreement: AgreementProps) => {
        setSelectedAgreement(agreement);
        onOpenU();
    };

    const handleDelete = async () => {
        if (!selectedAgreement || !selectedAgreement.agreementId) {
            toast.error("No se ha seleccionado un convenio para eliminar");
            return;
        }

        try {
            const result = await deleteAgreementAction(
                selectedAgreement.agreementId.toString()
            );

            if (result.success) {
                setLocalAgreements((prevAgreements) =>
                    prevAgreements.filter(
                        (a) => a.agreementId !== selectedAgreement.agreementId
                    )
                );
                toast.success("Convenio eliminado exitosamente");
                onCloseD(); // Cierra el modal después de eliminar
                router.refresh();
            }
        } catch (error) {
            console.error("Error al eliminar el convenio:", error);
            toast.error("Ocurrió un error al eliminar el convenio");
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return (
                    <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>
                );
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
                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {localAgreements.length > 0 ? (
                        localAgreements.map((agreement) => (
                            <tr key={agreement.agreementId} className="hover:bg-muted/50">
                                {columns.map((column) => (
                                    <td
                                        key={`${agreement.agreementId}-${String(column.key)}`}
                                        className={
                                            column.key === "description"
                                                ? "px-4 py-3 max-w-xs truncate"
                                                : "px-4 py-3"
                                        }
                                        title={
                                            column.key === "description"
                                                ? String(agreement.description)
                                                : undefined
                                        }
                                    >
                                        {column.key === "status"
                                            ? getStatusBadge(String(agreement.status))
                                            : String(agreement[column.key])}
                                    </td>
                                ))}
                                <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => handleOpenEditModal(agreement)}
                                            variant="outline"
                                            size="sm"
                                            className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none"
                                        >
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
                            <td
                                colSpan={columns.length + 1}
                                className="px-4 py-3 text-center"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal
                size="3xl"
                placement="center"
                isDismissable={false}
                isKeyboardDismissDisabled={false}
                isOpen={isOpenU}
                onClose={onCloseU}
                onOpenChange={onOpenChangeU}
                autoFocus={false}
            >
                <ModalContent className="px-3">
                    {() => (
                        <>
                            <ModalHeader>
                                <Title title="Editar convenio" />
                            </ModalHeader>
                            <ModalBody>
                                {selectedAgreement && (
                                    <AgreementForm
                                        agreement={selectedAgreement}
                                        onCloseU={onCloseU}
                                    />
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenD} onOpenChange={onOpenChangeD}>
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
                                <Button variant="secondaryWithoutHover" onClick={onCloseD}>
                                    Cancelar
                                </Button>
                                <Button variant="delete" onClick={handleDelete}>
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
