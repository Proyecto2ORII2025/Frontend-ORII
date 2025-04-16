"use client";

import { useState, useEffect } from "react";
import { fetchMovilities, deleteMovilityAction } from "@/actions/movilityAction";
import { Movility } from "@/types/movilityType";
import ModalEdit from "@/components/ui/modalEdit";
import ConfirmationModal from "@/components/ui/confirmationModal";
import ModalVer from "@/components/ui/modalView";
import MovilityTable from "@/components/movility/movilityTable";
import MovilityHeader from "@/components/movility/movilityHeader";
import { toast } from "sonner";

export default function MovilityList() {
    const [movilities, setMovilities] = useState<Movility[]>([]);
    const [selectedMovility, setSelectedMovility] = useState<Movility | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovilities, setSelectedMovilities] = useState<number[]>([]);

    const [filteredMovilities, setFilteredMovilities] = useState<Movility[]>([]);

    const handleFilterChange = (filtered: Movility[]) => {
        setFilteredMovilities(filtered);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchMovilities();
                setMovilities(response);
            } catch (error) {
                console.error("Error al obtener las movilidades:", error);
            }
        }
        fetchData();
    }, []);

    const openEditModal = (movility: Movility) => {
        setSelectedMovility(movility);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedMovility(null);
        setIsEditModalOpen(false);
    };

    const openViewModal = (movility: Movility) => {
        setSelectedMovility(movility);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setSelectedMovility(null);
        setIsViewModalOpen(false);
    };

    const updateMovilityList = (updatedMovility: Movility) => {
        setMovilities((prev) => prev.map((mob) => (mob.id === updatedMovility.id ? updatedMovility : mob)));
    };

    const handleSelectMovility = (id: number) => {
        if (selectedMovilities.includes(id)) {
            setSelectedMovilities(selectedMovilities.filter((mobId) => mobId !== id));
        } else {
            setSelectedMovilities([...selectedMovilities, id]);
        }
    };

    const handleDeleteSelected = () => {
        if (selectedMovilities.length > 0) {
            setIsModalOpen(true);
        } else {
            alert("Selecciona al menos una movilidad para eliminar.");
        }
    };

    const confirmDelete = async () => {
        try {
            await Promise.all(selectedMovilities.map((id) => deleteMovilityAction(id)));
            setMovilities(movilities.filter((mob) => !selectedMovilities.includes(mob.id)));
            setSelectedMovilities([]); // Limpiar selección
            toast.success("Movilidades eliminadas correctamente");
        } catch (error) {
            console.error("Error al eliminar las movilidades:", error);
            toast.error("Hubo un problema al eliminar las movilidades");
        }
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Header de movilidaes */}
            <MovilityHeader
                handleDeleteSelected={handleDeleteSelected}
                selectedMovilities={selectedMovilities}
                originalMovilities={movilities}
                onFilterChange={handleFilterChange}
            />

            {/* Mostrar la tabla solo si hay movilidades filtradas o si hay movilidades generales */}
            {(filteredMovilities.length != 0) && (
                <MovilityTable
                    movilities={filteredMovilities.length > 0 ? filteredMovilities : movilities}
                    selectedMovilities={selectedMovilities}
                    handleSelectMovility={handleSelectMovility}
                    openViewModal={openViewModal}
                    openEditModal={openEditModal}
                />
            )}

            {/* Modal de Edición */}
            <ModalEdit
                movility={selectedMovility}
                open={isEditModalOpen}
                onClose={closeEditModal}
                onUpdate={updateMovilityList}
            />

            {/* Modal de Ver */}
            {selectedMovility && (
                <ModalVer
                    movility={selectedMovility}
                    open={isViewModalOpen}
                    onClose={closeViewModal}
                />
            )}

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message={`¿Está seguro de eliminar ${selectedMovilities.length} movilidad(es)? Esta acción es irreversible.`}
            />
        </div>
    );
}
