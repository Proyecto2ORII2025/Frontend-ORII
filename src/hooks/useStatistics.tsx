import { useState, useEffect } from "react";
import { FilterState } from "@/types/filterChartType";
import { exportStatisticsReport } from "@/actions/statisticsAction";

export function useStatistics() {

    const [activeFilters, setActiveFilters] = useState<FilterState>({});

    const [fileBlob, setFileBlob] = useState<Blob | null>(null);
    const [disableExport, setDisableExport] = useState(true);

    useEffect(() => {
        async function fetchData() {
          try {
            const expData = await exportStatisticsReport();
            if (expData?.blob) { // && response.length > 0
              setDisableExport(false); // Hay datos para descargar y se pudo cargar el blob
              setFileBlob(expData.blob); // Guardar el blob
            }
          } catch (error) {
            console.error("Error al obtener el reporte de estadísticas:", error);
          }
        }
        fetchData();
      }, []);

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

    const removeFilter = (filterType: string) => {
        const newFilters = { ...activeFilters };
        delete newFilters[filterType as keyof FilterState];
        setActiveFilters(newFilters);
        applyFilters(newFilters);
    }

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
        handleFilter,
        removeFilter,
        fileBlob,
        disableExport
    };
}