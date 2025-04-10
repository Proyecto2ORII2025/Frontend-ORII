import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/basic-select";
import { AgreementProps } from "@/types/agreementType"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchAgreements } from "@/actions/agreementAction";
import { Info } from "lucide-react";

interface AgreementsSectionProps {
    agreement: string;
    agreementId: number;
    funding: string;
    fundingSource: string;
    errors: Record<string, string>;
    setters: {
        setAgreement: (value: string) => void;
        setAgreementId: (value: number) => void;
        setfunding: (value: string) => void;
        setFuenteFinanciacion: (value: string) => void;
    };
}

export function AgreementsSection({
    agreement,
    agreementId,
    funding,
    fundingSource,
    errors,
    setters
}: AgreementsSectionProps) {
    const [agreements, setAgreements] = useState<AgreementProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Cargar convenios al montar el componente o cuando se selecciona "Sí"
    useEffect(() => {
        const loadAgreements = async () => {
            if (agreement === "Y") {
                setIsLoading(true);
                try {
                    const data = await fetchAgreements();
                    setAgreements(data.ALL as AgreementProps[]);
                } catch (error) {
                    console.error("Error loading agreements:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadAgreements();
    }, [agreement]);

    // Crear opciones para el select
    const agreementOptions = agreements.map(agreement => ({
        label: `${agreement.agreementNumber}`,
        value: agreement.agreementId?.toString() || ''
    }));

    const handleAgreementChange = (value: string) => {
        setters.setAgreementId(Number(value));
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Convenios y patrocinios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="agreement">¿Existe convenio?</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Puede verificar si existe convenio, en el apartado CONVENIOS de la página</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={agreement}
                        onChange={(e) => setters.setAgreement(e.target.value)}
                        options={[
                            { label: "Sí", value: "Y" },
                            { label: "No", value: "N" },
                        ]}
                        placeholder="Seleccione una opción"
                    />
                    {errors.agreement && <p className="text-sm text-red-500">{errors.agreement}</p>}
                </div>

                {agreement === "Y" && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="numberAgreement">Número de convenio</Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Seleccione el convenio de la lista</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        {isLoading ? (
                            <p>Cargando convenios...</p>
                        ) : (
                            <Select
                                //id="numberAgreement"
                                value={agreementId.toString()}
                                onChange={(e) => handleAgreementChange(e.target.value)}
                                options={agreementOptions}
                                placeholder="Seleccione un convenio"
                            />
                        )}
                        {errors.agreementId && <p className="text-sm text-red-500">{errors.agreementId}</p>}
                    </div>
                )}

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="funding">Valor de la financiación en pesos</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ingrese el valor en pesos colombianos, sin signo pesos, ni puntos ni comas</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="funding"
                        type="text"
                        placeholder="$"
                        value={funding}
                        onChange={(e) => setters.setfunding(e.target.value)}
                    />
                    {errors.funding && <p className="text-sm text-red-500">{errors.funding}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="fundingSource">Fuente de la financiación</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Escriba aquí el nombre de la dependencia de la Universidad del Cauca y/o de otra institución que otorgó la financiación o la beca</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="fundingSource"
                        type="text"
                        value={fundingSource}
                        onChange={(e) => setters.setFuenteFinanciacion(e.target.value)}
                    />
                    {errors.fundingSource && <p className="text-sm text-red-500">{errors.fundingSource}</p>}
                </div>
            </div>
        </div>
    );
}