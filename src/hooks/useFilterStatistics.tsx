import { useState } from "react";
import { FilterState } from "@/types/filterChartType";

export function useStatisticsFilters() {

    const [activeFilters, setActiveFilters] = useState<FilterState>({});

    const applyFilters = (filters: FilterState = activeFilters) => {
        /*
        import { filterAgreements } from "@/utils/handleFilter";
        const filteredNational = filterAgreements(national, filters);
        const filteredInternational = filterAgreements(international, filters);
        setFilteredNational(filteredNational);
        setFilteredInternational(filteredInternational);

        LOGICA PARA ACTUALIZAR ESTADISTICAS*/
        if (Object.values(filters).some(Boolean)) {
            //Codigo si hay filtros
        }
        else {
            //Codigo si no hay filtros
        }
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
        applyFilters(newFilters);
    };

    return {
        activeFilters,
        handleFilter
    };
}