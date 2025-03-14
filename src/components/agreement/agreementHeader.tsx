"use client";

import { Search, Plus, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Title from "@/components/ui/title";
import Link from "next/link";
import { AgreementHeaderProps } from "@/types/agreementType";

export default function AgreementHeader({
    title,
    description,
    onSearch,
    searchTerm
}: AgreementHeaderProps) {
    return (
        <>
            <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Title title={title} />
                    {description && (
                        <p className="text-muted-foreground py-3">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {onSearch && (
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                        />
                        <Input
                            placeholder="Buscar por código, país, institución, descripción..."
                            className="pl-10 w-full"
                            onChange={(e) => onSearch(e.target.value)}
                            value={searchTerm}
                        />
                    </div>

                    <Link href={"/dashboard/agreements/create"}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
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
            )}
        </>
    );
}