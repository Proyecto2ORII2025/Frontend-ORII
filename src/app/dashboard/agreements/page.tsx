"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";
import AgreementHeader from "@/components/agreement/agreementHeader";
import AgreementTable from "@/components/agreement/agreementTable";
import { columns } from "@/config/agreementConfig";
import { useAgreements } from "@/hooks/useAgreements";
import { useAgreementFilters } from "@/hooks/useFilterAgreements";

export default function Agreements() {
    const [activeTab, setActiveTab] = useState("nacional");
    const [wasDeleted,] = useState("");
    const [wasUpdated,] = useState("");

    
    // Hook para obtener los acuerdos desde la API
    const {
        isLoading,
        nationalAgreements,
        internationalAgreements,
    } = useAgreements(wasDeleted, wasUpdated);
    
    // Hook para manejar filtros y búsquedas
    const {
        searchTerm,
        activeFilters,
        filteredNational,
        filteredInternational,
        handleSearch,
        handleFilter
    } = useAgreementFilters(nationalAgreements, internationalAgreements);


    return (
        <div className="flex flex-col gap-6 pb-10">
            <AgreementHeader
                title="Convenios"
                description="Administra todos los convenios nacionales e internacionales registrados"
                onSearch={handleSearch}
                onFilter={handleFilter}
                searchTerm={searchTerm}
                activeFilters={activeFilters}
                agreements={activeTab === "nacional" ? filteredNational : filteredInternational}
            />

            <Tabs defaultValue="internacional" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="internacional">Internacionales</TabsTrigger>
                    <TabsTrigger value="nacional">Nacionales</TabsTrigger>
                </TabsList>

                <TabsContent value="internacional" className="space-y-4">
                    <AgreementTable
                        agreements={filteredInternational}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron convenios internacionales"
                        columns={columns}
                    />
                </TabsContent>

                <TabsContent value="nacional" className="space-y-4">
                    <AgreementTable
                        agreements={filteredNational}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron convenios nacionales"
                        columns={columns}
                    />
                </TabsContent>

            </Tabs>
        </div>
    );
}