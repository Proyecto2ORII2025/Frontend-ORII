import { AgreementProps } from "@/types/agreementType";

export function handleSearch(
    value: string,
    nationalAgreements: AgreementProps[],
    internationalAgreements: AgreementProps[],
    setFilteredNationalAgreements: (agreements: AgreementProps[]) => void,
    setFilteredInternationalAgreements: (agreements: AgreementProps[]) => void,
    setIsSearching: (isSearching: boolean) => void
) {
    if (value === "") {
        setFilteredNationalAgreements(nationalAgreements);
        setFilteredInternationalAgreements(internationalAgreements);
        setIsSearching(false);
    } else {
        const filteredNational = nationalAgreements.filter(
            (agreement) =>
                (agreement.agreementNumber && agreement.agreementNumber.toLowerCase().includes(value.toLowerCase())) ||
                (agreement.country && agreement.country.toLowerCase().includes(value.toLowerCase())) ||
                (agreement.institution && agreement.institution.toLowerCase().includes(value.toLowerCase())) ||
                (agreement.description && agreement.description.toLowerCase().includes(value.toLowerCase()))
        );

        const filteredInternational = internationalAgreements.filter(
            (agreement) =>
                (agreement.agreementNumber && agreement.agreementNumber.toLowerCase().includes(value.toLowerCase())) ||
                (agreement.country && agreement.country.toLowerCase().includes(value.toLowerCase())) ||
                (agreement.institution && agreement.institution.toLowerCase().includes(value.toLowerCase())) ||
                (agreement.description && agreement.description.toLowerCase().includes(value.toLowerCase()))
        );

        setFilteredNationalAgreements(filteredNational);
        setFilteredInternationalAgreements(filteredInternational);
        setIsSearching(true);
    }
}