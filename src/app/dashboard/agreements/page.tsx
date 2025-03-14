"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgreementHeader from "@/components/agreement/agreementHeader";
import AgreementTable from "@/components/agreement/agreementTable";
import { columns } from "@/config/agreementConfig";
import { useAgreements } from "@/hooks/useAgreements";
import { handleSearch } from "@/utils/handleSearch";

export default function Agreements() {
    const [, setActiveTab] = useState("nacional");
    const [wasDeleted, ] = useState("");
    const [wasUpdated, ] = useState("");
    const [, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
    };

    return (
        <div className="flex flex-col gap-6 pb-10">
            <AgreementHeader
                title="Convenios"
                description="Administra todos los convenios nacionales e internacionales registrados"
                onSearch={handleSearchWrapper}
                searchTerm={searchTerm}
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