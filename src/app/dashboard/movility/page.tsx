"use client";

import { useState, useEffect } from "react";
import Title from "@/components/ui/title";
import { Search, Plus, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs2";
import { fetchMovilities } from "@/actions/movilityAction";
import { Movility } from "@/types/movilityType";
import ModalEdit from "@/components/ui/modalEdit"; 
import ModalVer from "@/components/ui/modalView"; 

const formatDate = (date: string) => {
    if (!date) return "Fecha no disponible";

    // Reparar el año si tiene formato incorrecto
    const parts = date.split("-");
    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        if (year < 100) {
            parts[0] = (year + 2000).toString();
        }
    }
    const fixedDate = parts.join("-");
    const parsedDate = new Date(fixedDate);

    if (isNaN(parsedDate.getTime())) return "Fecha inválida";

    return parsedDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export default function MovilityList() {
    const [movilities, setMovilities] = useState<Movility[]>([]);
    const [selectedMovility, setSelectedMovility] = useState<Movility | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false); 

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

    const documentTypeDict: Record<string, string> = {
        "V": "Visa",
        "CC": "Cédula de Ciudadanía",
        "TI": "Tarjeta de Identidad",
        "PP": "Pasaporte"
    };
    

    return (
        <div className="flex flex-col space-y-6 pb-10">
            <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Title title="Lista de movilidades" />
                    <p className="text-gray-600">Movilidades registradas nacionales e internacionales</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar por título, institución, tipo..." className="pl-10 w-full" />
                </div>
                <Link href="/dashboard/movility/create">
                    <Button>
                        <Plus />
                        Crear Movilidad
                    </Button>
                </Link>
            </div>
            <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full md:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtrar
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuItem>Por facultad</DropdownMenuItem>
                        <DropdownMenuItem>Por programa</DropdownMenuItem>
                        <DropdownMenuItem>Por tipo</DropdownMenuItem>
                        <DropdownMenuItem>Por ámbito</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                </Button>
            </div>
            <Tabs defaultValue="nacional" className="w-full">
                <TabsContent value="nacional" className="space-y-4">
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3">Nombre</th>
                                    <th className="px-4 py-3">Tipo de documento</th>
                                    <th className="px-4 py-3">Evento</th>
                                    <th className="px-4 py-3">Fecha de inicio</th>
                                    <th className="px-4 py-3">Fecha fin</th>
                                    <th className="px-4 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {movilities.map((mob) => (
                                    <tr key={mob.id} className="hover:bg-muted/50">
                                        <td className="px-4 py-3">{mob.person.firstName}</td>
                                        <td className="px-4 py-3">
                                            {documentTypeDict[mob.person.identificationType.trim().toUpperCase()] || mob.person.identificationType}
                                        </td>
                                        <td className="px-4 py-3">{mob.event.description}</td>
                                        <td className="px-4 py-3">{formatDate(mob.entryDate)}</td>
                                        <td className="px-4 py-3">{formatDate(mob.exitDate)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex space-x-2">
                                                {/* Botón Ver (abre ModalVer) */}
                                                <Button onClick={() => openViewModal(mob)}>Ver</Button>

                                                {/* Botón Editar (abre ModalEdit) */}
                                                <Button onClick={() => openEditModal(mob)}>Editar</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>

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
        </div>
    );
}
