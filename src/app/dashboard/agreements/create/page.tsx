"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Title from "@/components/ui/title"

export default function CreateAgreement() {
    return (
        <>
            <div className="mb-8">

                <Title
                    title="Crear convenio"
                />
                <p className="text-muted-foreground mt-2">
                    A continuación podrá crear un convenio. Por favor verifique que la información ingresada es correcta e ingrese
                    todos los campos.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información del Convenio</CardTitle>
                    <CardDescription>Complete todos los campos requeridos para crear el convenio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="pais">País</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>País de origen de la institución</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input id="pais" placeholder="Ingrese el país" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="codigo">Código</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Código único del convenio</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input id="codigo" placeholder="Ingrese el código" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="institucion">Institución</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Nombre de la institución</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Input id="institucion" placeholder="Ingrese el nombre de la institución" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="fecha">Fecha de inicio</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Fecha de inicio del convenio</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input id="fecha" type="date" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="ambito">Ámbito</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Tipo de convenio</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Select defaultValue="nacional">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el ámbito" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nacional">Nacional</SelectItem>
                                        <SelectItem value="internacional">Internacional</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="descripcion">Descripción</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Descripción detallada del convenio</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Textarea id="descripcion" placeholder="Ingrese una descripción del convenio" className="min-h-[100px]" />
                        </div>

                        <div className="flex justify-start space-x-4">
                            <Button className="w-1/4" variant="secondary" type="button">
                                Cancelar
                            </Button>
                            <Button className="w-1/3 md:w-1/4 px-4" type="submit">
                                Crear Convenio
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

