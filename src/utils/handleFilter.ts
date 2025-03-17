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
    const date = new Date(dateString);

    switch (filterValue) {
        case 'lastMonth':
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return date >= lastMonth;
        case 'lastYear':
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            return date >= lastYear;
        case 'expired':
            return date < new Date();
        default:
            return true;
    }
};