"use client"
import Title from "@/components/ui/title";
import { Search, Plus, Download, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Movility() {

    const movilidades = [
        {
            id: "m1",
            fechaInicio: "2023-09-01",
            fechaFin: "2023-12-15",
            facultad: "Facultad de Ingeniería",
            programa: "Ingeniería de Sistemas",
            ambitoMovilidad: "Nacional",
            tipo: "Entrada",
        },
        {
            id: "m2",
            fechaInicio: "2023-10-01",
            fechaFin: "2024-01-30",
            facultad: "Facultad de Ciencias",
            programa: "Biología",
            ambitoMovilidad: "Nacional",
            tipo: "Salida",
        },
        {
            id: "m3",
            fechaInicio: "2023-11-01",
            fechaFin: "2024-02-28",
            facultad: "Facultad de Ciencias Económicas",
            programa: "Economía",
            ambitoMovilidad: "Nacional",
            tipo: "Entrada",
        },
        {
            id: "m4",
            fechaInicio: "2023-12-01",
            fechaFin: "2024-03-31",
            facultad: "Facultad de Ciencias Sociales",
            programa: "Psicología",
            ambitoMovilidad: "Nacional",
            tipo: "Salida",
        },
        {
            id: "mi1",
            fechaInicio: "2023-09-15",
            fechaFin: "2023-12-20",
            facultad: "Facultad de Artes",
            programa: "Música",
            ambitoMovilidad: "Internacional",
            tipo: "Entrada",
        },
        {
            id: "mi2",
            fechaInicio: "2023-10-10",
            fechaFin: "2024-01-15",
            facultad: "Facultad de Ciencias de la Salud",
            programa: "Medicina",
            ambitoMovilidad: "Internacional",
            tipo: "Salida",
        },
        {
            id: "mi3",
            fechaInicio: "2023-11-05",
            fechaFin: "2024-02-25",
            facultad: "Facultad de Derecho",
            programa: "Derecho",
            ambitoMovilidad: "Internacional",
            tipo: "Entrada",
        },
        {
            id: "mi4",
            fechaInicio: "2023-12-10",
            fechaFin: "2024-03-20",
            facultad: "Facultad de Ingeniería",
            programa: "Ingeniería Civil",
            ambitoMovilidad: "Internacional",
            tipo: "Salida",
        },
    ];


    return (
        <>
            <div className="flex flex-col space-y-6 pb-10">
                <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Title title="Lista de movilidades" /><br></br>
                        <p className="text-gray-600">
                            Movilidades registradas nacionales e internacionales
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por título, institución, tipo..." className="pl-10 w-full" />
                    </div>
                    <Link href="/dashboard/agreements/create">
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

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Fecha de inicio</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Fecha fin</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Facultad</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Programa</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Ámbito de movilidad</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Tipo</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {movilidades.map((movilidad) => (
                                <tr key={movilidad.id} className="hover:bg-muted/50">
                                    <td className="px-4 py-3">{movilidad.fechaInicio}</td>
                                    <td className="px-4 py-3">{movilidad.fechaFin}</td>
                                    <td className="px-4 py-3">{movilidad.facultad}</td>
                                    <td className="px-4 py-3">{movilidad.programa}</td>
                                    <td className="px-4 py-3">{movilidad.ambitoMovilidad}</td>
                                    <td className="px-4 py-3">{movilidad.tipo}</td>
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
            </div>
        </>
    )
}