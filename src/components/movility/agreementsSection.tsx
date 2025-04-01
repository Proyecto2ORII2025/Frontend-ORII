import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/basic-select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AgreementsSectionProps {
    agreement: string;
    agreementId: number;
    valorFinanciacion: string;
    fundingSource: string;
    errors: Record<string, string>;
    setters: {
        setAgreement: (value: string) => void;
        setAgreementId: (value: number) => void;
        setValorFinanciacion: (value: string) => void;
        setFuenteFinanciacion: (value: string) => void;
    };
}

export function AgreementsSection({
    agreement,
    agreementId,
    valorFinanciacion,
    fundingSource,
    errors,
    setters
}: AgreementsSectionProps) {
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
                                        <p>En el apartado CONVENIOS en la barra de navegación puede consultar los convenios existentes</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Input
                            id="numberAgreement"
                            type="number"
                            value={agreementId}
                            // onChange={(e) => setters.setAgreementId(Number(e.target.value))}
                            onChange={(e) => {
                                console.log("Valor ingresado:", e.target.value); // Verifica que el valor llegue correctamente
                                setters.setAgreementId(Number(e.target.value));
                              }}
                            
                        />
                        {errors.agreementId && <p className="text-sm text-red-500">{errors.agreementId}</p>}
                    </div>
                )}

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="valorFinanciacion">Valor de la financiación en pesos</Label>
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
                        id="valorFinanciacion"
                        type="text"
                        value={valorFinanciacion}
                        onChange={(e) => setters.setValorFinanciacion(e.target.value)}
                    />
                    {errors.valorFinanciacion && <p className="text-sm text-red-500">{errors.valorFinanciacion}</p>}
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