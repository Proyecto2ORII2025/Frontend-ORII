import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/basic-select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { options, eventDescriptions } from "@/utils/movilityUtils";

interface GeneralInfoSectionProps {
    movilityType: string;
    faculty: string;
    eventTypeId: number;
    description: string;
    movilityScope: string;
    cta: number;
    errors: Record<string, string>;
    setters: {
        setMovilityType: (value: string) => void;
        setFaculty: (value: string) => void;
        setEventType: (value: number) => void;
        setEventDescription: (value: string) => void;
        setMovilityScope: (value: string) => void;
        setCta: (value: number) => void;
    };
}

export function GeneralInfoSection({
    movilityType,
    faculty,
    eventTypeId,
    description,
    movilityScope,
    cta,
    errors,
    setters
}: GeneralInfoSectionProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Información general de la movilidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="movilityType">Sentido de movilidad</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione el sentido de movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={movilityType}
                        onChange={(e) => setters.setMovilityType(e.target.value)}
                        options={[
                            { label: "Entrante presencial", value: "INCOMING_IN_PERSON" },
                            { label: "Saliente presencial", value: "OUTGOING_IN_PERSON" },
                            { label: "Entrante virtual", value: "INCOMING_VIRTUAL" },
                            { label: "Saliente virtual", value: "OUTGOING_VIRTUAL" },
                        ]}
                        placeholder="Seleccione el tipo de movilidad"
                    />
                    {errors.movilityType && <p className="text-sm text-red-500">{errors.movilityType}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="faculty">Facultad</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione la facultad a la que pertenece la movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={faculty}
                        onChange={(e) => setters.setFaculty(e.target.value)}
                        options={[
                            { label: "Facultad de Artes", value: "FA" },
                            { label: "Facultad de Ciencias Agrarias", value: "FCA" },
                            { label: "Facultad de Ciencias de la Salud", value: "FCS" },
                            { label: "Facultad de Ciencias Contables, Económicas y Administrativas", value: "FCCEA" },
                            { label: "Facultad de Ciencias Humanas", value: "FCH" },
                            { label: "Facultad de Ciencias Naturales, Exactas y de la Educación", value: "FACNED" },
                            { label: "Facultad de Derecho, Ciencias Políticas y Sociales", value: "FDCPS" },
                            { label: "Facultad de Ingeniería Civil", value: "FIC" },
                            { label: "Facultad de Ingeniería Electrónica y Telecomunicaciones", value: "FIET" },
                        ]}
                        placeholder="Seleccione una facultad"
                    />
                    {errors.faculty && <p className="text-sm text-red-500">{errors.faculty}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="eventTypeId">Tipo de evento</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione el tipo de evento asociado a la movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={eventTypeId ? eventTypeId.toString() : ""}
                        onChange={(e) => setters.setEventType(Number(e.target.value))}
                        options={options}
                        placeholder="Seleccione el tipo de evento"
                    />
                    {errors.eventTypeId && <p className="text-sm text-red-500">{errors.eventTypeId}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="description">Descripción del evento</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{eventDescriptions[eventTypeId as keyof typeof eventDescriptions]}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setters.setEventDescription(e.target.value)}
                        placeholder="Ingrese la descripción del evento"
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="movilityScope">Ámbito</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione el ámbito de la movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={movilityScope}
                        onChange={(e) => setters.setMovilityScope(e.target.value)}
                        options={[
                            { label: "Nacional", value: "ambito_nacional" },
                            { label: "Internacional", value: "ambito_internacional" },
                        ]}
                        placeholder="Seleccione el ámbito"
                    />
                    {errors.movilityScope && <p className="text-sm text-red-500">{errors.movilityScope}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="cta">Semestre</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione el periodo académico</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={cta ? cta.toString() : ""}
                        onChange={(e) => setters.setCta(Number(e.target.value))}
                        options={[
                            { label: "Periodo 1", value: "1" },
                            { label: "Periodo 2", value: "2" },
                        ]}
                        placeholder="Seleccione el periodo"
                    />
                    {errors.cta && <p className="text-sm text-red-500">{errors.cta}</p>}
                </div>
            </div>
        </div>
    );
}