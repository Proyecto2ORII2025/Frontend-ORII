import { useEffect, useState } from "react";
import { Agreement } from "../types/agreementsTypes";
import { getFilteredAgreements } from "@/services/agreement.service";

export const useAgreementsData = (refleshFlag: boolean) => {
    const [nationalAgreements, setNationalAgreements] = useState<Agreement[]>([]);
    const [internationalAgreements, setInternationalAgreements] = useState<
        Agreement[]
    >([]);

    const loadAgreements = async () => {
        try {
            const response = await getFilteredAgreements();
            setNationalAgreements(response?.national || []);
            setInternationalAgreements(response?.international || []);
          } catch (err) {
            console.error("Error al cargar los convenios:", err);
            setNationalAgreements([]);
            setInternationalAgreements([]);
          }
    }

    useEffect(() => {
        loadAgreements();
    }, [refleshFlag]);

    return { nationalAgreements, internationalAgreements };
}