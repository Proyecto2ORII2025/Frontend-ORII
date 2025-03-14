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


export default function MovilityList() {
    const [movilities, setMovilities] = useState<Movility[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchMovilities();
                setMovilities(response);
                console.log("Llega ", response)
            } catch (error) {
                console.error("Error al obtener las movilidades:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col space-y-6 pb-10">
            <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Title title="Lista de movilidades" /><br />
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
                                    <th className="px-4 py-3 text-left font-bold text-blue">Código de convenio</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Tipo de documento</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Documento usuario</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Fecha de inicio</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Fecha fin</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Facultad</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Programa</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Tipo</th>
                                    <th className="px-4 py-3 text-left font-bold text-blue">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {movilities.map((mob) => (
                                    <tr key={mob.id} className="hover:bg-muted/50">
                                        <td className="px-4 py-3">{mob.agreement}</td>
                                        <td className="px-4 py-3">{mob.person.identificationType}</td>
                                        <td className="px-4 py-3">{mob.person.identification}</td>
                                        <td className="px-4 py-3">{mob.direction}</td>
                                        <td className="px-4 py-3">{mob.exitDate}</td>
                                        <td className="px-4 py-3">{mob.faculty}</td>
                                        <td className="px-4 py-3">{mob.originProgram}</td>
                                        <td className="px-4 py-3">{mob.event.eventType.name}</td>
                                        <td className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <button className="bg-tertiary/30 hover:bg-tertiary/40 text-tertiary/80 border-tertiary/50 px-2 py-1 rounded-md">
                                                Ver
                                            </button>
                                            <button className="bg-tertiary/30 hover:bg-tertiary/40 text-tertiary/80 border-tertiary/50 px-2 py-1 rounded-md">
                                                Editar
                                            </button>
                                            <button className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300 px-2 py-1 rounded-md">
                                                Descargar
                                            </button>
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
