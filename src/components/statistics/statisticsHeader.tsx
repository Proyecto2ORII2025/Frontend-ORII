"use client";

import { Search, Plus, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import Title from "@/components/ui/typography/title";
import Link from "next/link";
import { StatisticsHeaderProps } from "@/types/ChartTypes";
import ExportButton from "@/components/ui/buttons/exportButton";

export default function StatisticsHeader({
    title,
    description,
    onFilter,
    activeFilters,
}: StatisticsHeaderProps) {
    return (
        <>
            <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Title title={title} />
                    {description && (
                        <p className="text-muted-foreground py-3">{description}</p>
                    )}
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">

                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full md:w-auto ${Object.values(activeFilters || {}).some((v) => v)
                                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                                    : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                                    } border-purple-300`}
                            >
                                <Filter className="mr-2 h-4 w-4" />
                                Agregar Filtro
                                {Object.values(activeFilters || {}).some((v) => v) && (
                                    <span className="ml-2 text-xs bg-white text-purple-700 rounded-full w-5 h-5 flex items-center justify-center">
                                        {
                                            Object.values(activeFilters || {}).filter(Boolean)
                                                .length
                                        }
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuItem onClick={() => onFilter?.("date", "today")}>
                                Hoy
                                {activeFilters?.date === "today" && (
                                    <Check className="ml-auto text-accesibility" />
                                )}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => onFilter?.("date", "lastMonth")}
                            >
                                Último mes
                                {activeFilters?.date === "lastMonth" && (
                                    <Check className="ml-auto text-accesibility" />
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onFilter?.("date", "lastYear")}
                            >
                                Último año
                                {activeFilters?.date === "lastYear" && (
                                    <Check className="ml-auto text-accesibility" />
                                )}
                            </DropdownMenuItem>

                            <DropdownMenuItem className="border-t border-blue/30" disabled>
                                Estado
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => onFilter?.("status", "ACTIVE")}
                            >
                                Activos
                                {activeFilters?.status === "ACTIVE" && (
                                    <Check className="ml-auto text-accesibility" />
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onFilter?.("status", "INACTIVE")}
                            >
                                Inactivos
                                {activeFilters?.status === "INACTIVE" && (
                                    <Check className="ml-auto text-accesibility" />
                                )}
                            </DropdownMenuItem>

                            {Object.values(activeFilters || {}).some((v) => v) && (
                                <DropdownMenuItem
                                    className="border-t border-blue/30 font-semibold text-error focus:bg-error focus:text-white"
                                    onClick={() => onFilter?.("reset")}
                                >
                                    Limpiar filtros
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ExportButton
                        agreements={[]}
                    />
                </div>
            </div>

        </>
    );
}