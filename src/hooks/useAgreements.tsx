// src/hooks/useAgreements.ts
import { useEffect, useState } from "react";
import { AgreementProps, AgreementsData } from "@/types/agreementType";
import { fetchAgreements } from "@/actions/agreementAction";

export function useAgreements(wasDeleted: string, wasUpdated: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [nationalAgreements, setNationalAgreements] = useState<AgreementProps[]>([]);
    const [internationalAgreements, setInternationalAgreements] = useState<AgreementProps[]>([]);
    const [filteredNationalAgreements, setFilteredNationalAgreements] = useState<AgreementProps[]>([]);
    const [filteredInternationalAgreements, setFilteredInternationalAgreements] = useState<AgreementProps[]>([]);

    useEffect(() => {
        const loadAgreements = async () => {
            setIsLoading(true);
            const agreementsData: AgreementsData = await fetchAgreements();
            setNationalAgreements(agreementsData.NATIONAL as AgreementProps[]);
            setInternationalAgreements(agreementsData.INTERNATIONAL as AgreementProps[]);
            setFilteredNationalAgreements(agreementsData.NATIONAL as AgreementProps[]);
            setFilteredInternationalAgreements(agreementsData.INTERNATIONAL as AgreementProps[]);
            setIsLoading(false);
        };
        loadAgreements();
    }, [wasDeleted, wasUpdated]);

    return {
        isLoading,
        nationalAgreements,
        internationalAgreements,
        filteredNationalAgreements,
        filteredInternationalAgreements,
        setFilteredNationalAgreements,
        setFilteredInternationalAgreements
    };
}