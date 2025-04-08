"use client";

import { Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/navigation/dropdown-menu";
import Title from "@/components/ui/typography/title";
import { StatisticsHeaderProps } from "@/types/chartTypes";
import ExportButton from "@/components/ui/buttons/exportButton";
import FilterSelector from "@/components/statistics/filterSelector";
import { filterOptions, filterNames } from "@/types/filterChartType";

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
                <div className="flex flex-wrap gap-4 mb-4">

                    {/* Renderizar los filtros seleccionados */}
                        {Object.entries(activeFilters || {})
                            .filter(([, value]) => value !== undefined) // Filtrar valores no definidos
                            .map(([filterName, activeValue]) => {
                                const filterIndex = Object.keys(filterOptions).indexOf(filterName);

                                return (
                                    <FilterSelector
                                        key={filterName}
                                        filterName={filterNames[filterIndex] || filterName}
                                        filterValues={filterOptions[filterName as keyof typeof filterOptions] || []}
                                        activeValue={activeValue}
                                        onSelect={(value) => onFilter(filterName, value)}
                                        onRemove={() => onFilter(filterName, undefined)}
                                    />
                                );
                            })}


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
                                    {!Object.values(activeFilters || {}).some((v) => v) && "Agregar Filtro"}
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
                                {Object.keys(filterOptions).map((filterKey, index) => (
                                    <DropdownMenuItem key={filterKey} onClick={() => onFilter(filterKey, "")} >
                                        {filterNames[index]}
                                        {activeFilters?.[filterKey as keyof typeof activeFilters] && (
                                            <Check className="ml-auto text-accesibility" />
                                        )}
                                    </DropdownMenuItem>
                                ))}
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
                        <ExportButton agreements={[]} />
                </div>
            </div>
        </>
    );
}