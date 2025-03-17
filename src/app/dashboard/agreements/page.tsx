"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgreementHeader from "@/components/agreement/agreementHeader";
import AgreementTable from "@/components/agreement/agreementTable";
import { columns } from "@/config/agreementConfig";
import { useAgreements } from "@/hooks/useAgreements";
import { handleSearch } from "@/utils/handleSearch";
import { filterAgreements } from "@/utils/handleFilter";
import { FilterState } from "@/types/filterAgreementType";

export default function Agreements() {
    const [, setActiveTab] = useState("nacional");
    const [wasDeleted, ] = useState("");
    const [wasUpdated, ] = useState("");
    const [, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilters, setActiveFilters] = useState<FilterState>({});

    const {
        isLoading,
        nationalAgreements,
        internationalAgreements,
        filteredNationalAgreements,
        filteredInternationalAgreements,
        setFilteredNationalAgreements,
        setFilteredInternationalAgreements
    } = useAgreements(wasDeleted, wasUpdated);

    const handleSearchWrapper = (value: string) => {
        setSearchTerm(value);
        handleSearch(
            value,
            nationalAgreements,
            internationalAgreements,
            setFilteredNationalAgreements,
            setFilteredInternationalAgreements,
            setIsSearching
        );
        
        // Si hay filtros activos, aplicarlos después de la búsqueda
        if (Object.values(activeFilters).some(Boolean)) {
            applyCurrentFilters(value);
        }
    };
    
    const handleFilter = (filterType: string, value?: string) => {
        let newFilters = { ...activeFilters };
        
        if (filterType === 'reset') {
            // Resetear todos los filtros
            newFilters = {};
        } else if (newFilters[filterType as keyof FilterState] === value) {
            // Si ya está seleccionado, quitar el filtro
            delete newFilters[filterType as keyof FilterState];
        } else {
            // Aplicar nuevo filtro
            newFilters[filterType as keyof FilterState] = value;
        }
        
        setActiveFilters(newFilters);
        applyCurrentFilters(searchTerm, newFilters);
    };
    
    const applyCurrentFilters = (search: string, filters = activeFilters) => {
        // Si hay términos de búsqueda, filtrar primero por búsqueda
        const nationalToFilter = search ? 
            filteredNationalAgreements : 
            nationalAgreements;
            
        const internationalToFilter = search ? 
            filteredInternationalAgreements : 
            internationalAgreements;
        
        // Aplicar filtros a los resultados
        if (Object.values(filters).some(Boolean)) {
            const filteredNational = filterAgreements(nationalToFilter, filters);
            const filteredInternational = filterAgreements(internationalToFilter, filters);
            
            setFilteredNationalAgreements(filteredNational);
            setFilteredInternationalAgreements(filteredInternational);
            setIsSearching(true);
        } else if (!search) {
            // Si no hay búsqueda ni filtros, mostrar todos
            setFilteredNationalAgreements(nationalAgreements);
            setFilteredInternationalAgreements(internationalAgreements);
            setIsSearching(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-10">
            <AgreementHeader
                title="Convenios"
                description="Administra todos los convenios nacionales e internacionales registrados"
                onSearch={handleSearchWrapper}
                onFilter={handleFilter}
                searchTerm={searchTerm}
                activeFilters={activeFilters}
            />

            <Tabs defaultValue="nacional" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="nacional">Nacionales</TabsTrigger>
                    <TabsTrigger value="internacional">Internacionales</TabsTrigger>
                </TabsList>

                <TabsContent value="nacional" className="space-y-4">
                    <AgreementTable
                        agreements={filteredNationalAgreements}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron convenios nacionales"
                        columns={columns}
                    />
                </TabsContent>

                <TabsContent value="internacional" className="space-y-4">
                    <AgreementTable
                        agreements={filteredInternationalAgreements}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron convenios internacionales"
                        columns={columns}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}