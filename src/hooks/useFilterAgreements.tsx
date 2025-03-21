import { useState } from "react";
import { AgreementProps } from "@/types/agreementType";
import { FilterState } from "@/types/filterAgreementType";
import { filterAgreements } from "@/utils/handleFilter";

export function useAgreementFilters(
    originalNational: AgreementProps[],
    originalInternational: AgreementProps[],
) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilters, setActiveFilters] = useState<FilterState>({});
    const [isSearching, setIsSearching] = useState(false);
    const [filteredNational, setFilteredNational] = useState<AgreementProps[]>(originalNational);
    const [filteredInternational, setFilteredInternational] = useState<AgreementProps[]>(originalInternational);

    // Método central que maneja tanto búsqueda como filtros
    const applyFiltersAndSearch = (search: string = searchTerm, filters: FilterState = activeFilters) => {
        // Si hay solo búsqueda (sin filtros)
        if (search && !Object.values(filters).some(Boolean)) {
            applySearch(search, originalNational, originalInternational);
        }
        // Si hay solo filtros (sin búsqueda)
        else if (!search && Object.values(filters).some(Boolean)) {
            applyFilters(filters, originalNational, originalInternational);
        }
        // Si hay ambos (búsqueda y filtros)
        else if (search && Object.values(filters).some(Boolean)) {
            applySearchAndFilters(search, filters);
        }
        // Si no hay ni búsqueda ni filtros
        else {
            resetToOriginal();
        }
    };

    // Función auxiliar para aplicar solo búsqueda
    const applySearch = (term: string, national = originalNational, international = originalInternational) => {
        const filteredNational = national.filter(agreement => filterBySearchTerm(agreement, term));
        const filteredInternational = international.filter(agreement => filterBySearchTerm(agreement, term));

        setFilteredNational(filteredNational);
        setFilteredInternational(filteredInternational);
        setIsSearching(true);
    };

    // Función auxiliar para aplicar solo filtros
    const applyFilters = (filters: FilterState, national = originalNational, international = originalInternational) => {
        const filteredNational = filterAgreements(national, filters);
        const filteredInternational = filterAgreements(international, filters);

        setFilteredNational(filteredNational);
        setFilteredInternational(filteredInternational);
        setIsSearching(true);
    };

    // Función auxiliar para aplicar búsqueda y filtros
    const applySearchAndFilters = (term: string, filters: FilterState) => {
        // Primero filtrar por búsqueda
        const nationalSearched = originalNational.filter(agreement => filterBySearchTerm(agreement, term));
        const internationalSearched = originalInternational.filter(agreement => filterBySearchTerm(agreement, term));

        // Luego aplicar filtros a los resultados
        const filteredNational = filterAgreements(nationalSearched, filters);
        const filteredInternational = filterAgreements(internationalSearched, filters);

        setFilteredNational(filteredNational);
        setFilteredInternational(filteredInternational);
        setIsSearching(true);
    };

    // Función auxiliar para restaurar los valores originales
    const resetToOriginal = () => {
        setFilteredNational(originalNational);
        setFilteredInternational(originalInternational);
        setIsSearching(false);
    };

    // Función para verificar si un acuerdo coincide con el término de búsqueda
    const filterBySearchTerm = (agreement: AgreementProps, term: string): boolean => {
        return (
            String(agreement.agreementNumber)?.toLowerCase().includes(term.toLowerCase()) ||
            String(agreement.country)?.toLowerCase().includes(term.toLowerCase()) ||
            String(agreement.institution)?.toLowerCase().includes(term.toLowerCase()) ||
            String(agreement.description)?.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Manejador de búsqueda
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        applyFiltersAndSearch(value);
    };

    // Manejador de filtros
    const handleFilter = (filterType: string, value?: string) => {
        let newFilters = { ...activeFilters };

        if (filterType === 'reset') {
            newFilters = {};
        } else if (newFilters[filterType as keyof FilterState] === value) {
            delete newFilters[filterType as keyof FilterState];
        } else {
            newFilters[filterType as keyof FilterState] = value;
        }

        setActiveFilters(newFilters);
        applyFiltersAndSearch(searchTerm, newFilters);
    };
    
    // Actualizar los resultados filtrados cuando cambien los datos originales
    if (originalNational !== filteredNational && !isSearching && !Object.values(activeFilters).some(Boolean)) {
        setFilteredNational(originalNational);
    }
    
    if (originalInternational !== filteredInternational && !isSearching && !Object.values(activeFilters).some(Boolean)) {
        setFilteredInternational(originalInternational);
    }

    return {
        searchTerm,
        activeFilters,
        filteredNational,
        filteredInternational,
        handleSearch,
        handleFilter
    };
}