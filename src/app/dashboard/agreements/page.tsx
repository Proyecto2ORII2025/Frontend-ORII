"use client"

import { Search, Plus, Download, Filter, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Title from "@/components/ui/title"
import Link from "next/link"

export default function Agreements() {
    const [, setActiveTab] = useState("nacional")

    // Datos de ejemplo actualizados con universidades de Colombia
    const conveniosNacionales = [
        {
            id: "n1",
            pais: "Colombia",
            institucion: "Universidad Nacional de Colombia",
            codigo: "CN-001",
            descripcion: "Convenio de cooperación académica e investigación",
            fechaInicio: "15/01/2024",
            estado: "Activo",
        },
        {
            id: "n2",
            pais: "Colombia",
            institucion: "Universidad de Antioquia",
            codigo: "CN-002",
            descripcion: "Convenio de movilidad estudiantil y docente",
            fechaInicio: "03/03/2024",
            estado: "Pendiente",
        },
        {
            id: "n3",
            pais: "Colombia",
            institucion: "Universidad del Valle",
            codigo: "CN-003",
            descripcion: "Acuerdo marco de colaboración institucional",
            fechaInicio: "22/02/2024",
            estado: "Activo",
        },
        {
            id: "n4",
            pais: "Colombia",
            institucion: "Universidad de los Andes",
            codigo: "CN-004",
            descripcion: "Convenio para intercambio de investigadores",
            fechaInicio: "10/04/2024",
            estado: "Activo",
        },
    ]

    // Datos de ejemplo actualizados con universidades de España
    const conveniosInternacionales = [
        {
            id: "i1",
            pais: "España",
            institucion: "Universidad de Barcelona",
            codigo: "CI-001",
            descripcion: "Convenio de intercambio estudiantil y doble titulación",
            fechaInicio: "10/12/2023",
            estado: "Activo",
        },
        {
            id: "i2",
            pais: "España",
            institucion: "Universidad Complutense de Madrid",
            codigo: "CI-002",
            descripcion: "Convenio de investigación en ciencias sociales",
            fechaInicio: "05/02/2024",
            estado: "Activo",
        },
        {
            id: "i3",
            pais: "España",
            institucion: "Universidad de Granada",
            codigo: "CI-003",
            descripcion: "Acuerdo para estancias académicas de docentes",
            fechaInicio: "18/03/2024",
            estado: "Pendiente",
        },
    ]

    const getStatusBadge = (estado: string) => {
        switch (estado) {
            case "Activo":
                return <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>
            case "Pendiente":
                return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendiente</Badge>
            default:
                return <Badge variant="outline">{estado}</Badge>
        }
    }

    return (
        <>
            <div className="flex flex-col space-y-6 pb-10">
                <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Title title="Convenios" />
                        <p className="text-muted-foreground py-6">
                            Administra todos los convenios nacionales e internacionales registrados
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
                            Crear Convenio
                        </Button>
                    </Link>

                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full md:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filtrar
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuItem>Por fecha</DropdownMenuItem>
                                <DropdownMenuItem>Por estado</DropdownMenuItem>
                                <DropdownMenuItem>Por tipo</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant="outline" className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300">
                            <Download className="mr-2 h-4 w-4" />
                            Exportar
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="nacional" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="nacional">Nacionales</TabsTrigger>
                        <TabsTrigger value="internacional">Internacionales</TabsTrigger>
                    </TabsList>

                    <TabsContent value="nacional" className="space-y-4">
                        <div className="overflow-hidden rounded-lg border">
                            <table className="w-full text-sm">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">País</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Institución</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Código</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Descripción</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Fecha de inicio</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Estado</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {conveniosNacionales.map((convenio) => (
                                        <tr key={convenio.id} className="hover:bg-muted/50">
                                            <td className="px-4 py-3">{convenio.pais}</td>
                                            <td className="px-4 py-3">{convenio.institucion}</td>
                                            <td className="px-4 py-3">{convenio.codigo}</td>
                                            <td className="px-4 py-3 max-w-xs truncate" title={convenio.descripcion}>
                                                {convenio.descripcion}
                                            </td>
                                            <td className="px-4 py-3">{convenio.fechaInicio}</td>
                                            <td className="px-4 py-3">{getStatusBadge(convenio.estado)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" className="bg-tertiary/30 hover:bg-tertiary/40 text-tertiary/80 border-tertiary/50">
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">Ver</span>
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300">
                                                        <Download className="h-4 w-4" />
                                                        <span className="sr-only">Descargar</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>

                    <TabsContent value="internacional" className="space-y-4">
                        <div className="overflow-hidden rounded-lg border">
                            <table className="w-full text-sm">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">País</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Institución</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Código</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Descripción</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Fecha de inicio</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Estado</th>
                                        <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {conveniosInternacionales.map((convenio) => (
                                        <tr key={convenio.id} className="hover:bg-muted/50">
                                            <td className="px-4 py-3">{convenio.pais}</td>
                                            <td className="px-4 py-3">{convenio.institucion}</td>
                                            <td className="px-4 py-3">{convenio.codigo}</td>
                                            <td className="px-4 py-3 max-w-xs truncate" title={convenio.descripcion}>
                                                {convenio.descripcion}
                                            </td>
                                            <td className="px-4 py-3">{convenio.fechaInicio}</td>
                                            <td className="px-4 py-3">{getStatusBadge(convenio.estado)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" className="bg-tertiary/30 hover:bg-tertiary/40 text-tertiary/80 border-tertiary/50">
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">Ver</span>
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300">
                                                        <Download className="h-4 w-4" />
                                                        <span className="sr-only">Descargar</span>
                                                    </Button>
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
        </>
    )
}