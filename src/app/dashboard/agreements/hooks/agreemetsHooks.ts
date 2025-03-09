import { useEffect, useState } from "react";
import { Agreement } from "../types/agreementsTypes";
import { getFilteredAgreements } from "@/services/agreement.service";

export const useAgreementsData = (refleshFlag: boolean) => {
    const [nationalAgreements, setNationalAgreements] = useState<Agreement[]>([]);
    const [internationalAgreements, setInternationalAgreements] = useState<
        Agreement[]
    >([]);

    useEffect(() => {
        const loadAgreements = async () => {
            const { national, international } = await getFilteredAgreements();
            setNationalAgreements(national);
            setInternationalAgreements(international);
        }

        loadAgreements();
    }, [refleshFlag]);

    return { nationalAgreements, internationalAgreements };
}