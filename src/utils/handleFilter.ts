import { AgreementProps } from '@/types/agreementType';

export const filterAgreements = (
    agreements: AgreementProps[],
    filters: {
        date?: string;
        status?: string;
    }
) => {
    return agreements.filter(agreement => {
        // Filtro por fecha
        if (filters.date && !matchesDateFilter(agreement.startDate, filters.date)) {
            return false;
        }

        // Filtro por estado
        if (filters.status && agreement.status !== filters.status) {
            return false;
        }

        return true;
    });
};

const matchesDateFilter = (dateString: string, filterValue: string) => {
    // Si no hay fecha válida, no filtrar
    if (!dateString) return true;

    const date = new Date(dateString);
    const now = new Date();

    // Asegurarse que la fecha es válida
    if (isNaN(date.getTime())) return true;

    switch (filterValue) {
        case 'today': {
            // Verificar si la fecha es hoy
            return date.toDateString() === now.toDateString();
        }

        case 'lastMonth': {
            // Obtener el primer día del mes actual
            const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            // Obtener el primer día del mes anterior
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            // Verificar si la fecha está en el mes pasado (entre el inicio y fin del mes pasado)
            return date >= lastMonth && date < currentMonth;
        }

        case 'lastYear': {
            // Obtener el primer día del año actual
            const currentYear = new Date(now.getFullYear(), 0, 1);
            // Obtener el primer día del año anterior
            const lastYear = new Date(now.getFullYear() - 1, 0, 1);
            // Verificar si la fecha está en el año pasado (entre inicio y fin del año anterior)
            return date >= lastYear && date < currentYear;
        }

        default:
            return true;
    }
};