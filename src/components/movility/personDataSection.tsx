import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/basic-select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface PersonDataSectionProps {
    firstName: string;
    lastName: string;
    gender: string;
    personType: string;
    identificationType: string;
    identification: string;
    email: string;
    errors: Record<string, string>;
    setters: {
        setFirstName: (value: string) => void;
        setLastName: (value: string) => void;
        setGender: (value: string) => void;
        setRole: (value: string) => void;
        setDocumentType: (value: string) => void;
        setDocumentNumber: (value: string) => void;
        setEmail: (value: string) => void;
    };
}

export function PersonDataSection({
    firstName,
    lastName,
    gender,
    personType,
    identificationType,
    identification,
    email,
    errors,
    setters
}: PersonDataSectionProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Datos de la persona movilizada</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="firstName">Nombre(s)</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nombres de la persona, conforme está escrito en el documento de identificación</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setters.setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="lastName">Apellidos</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Apellidos de la persona, conforme está escrito en el documento de identificación</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setters.setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="gender">Género</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione el género de la persona</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={gender}
                        onChange={(e) => setters.setGender(e.target.value)}
                        options={[
                            { label: "Femenino", value: "F" },
                            { label: "Masculino", value: "M" },
                            { label: "Otro", value: "O" },
                        ]}
                        placeholder="Seleccione el género"
                    />
                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="personType">Rol</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione el rol de la persona</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={personType}
                        onChange={(e) => setters.setRole(e.target.value)}
                        options={[
                            { label: "Estudiante", value: "STUDENT" },
                            { label: "Docente", value: "TEACHER" },
                            { label: "Administrativo", value: "ADMIN" },
                        ]}
                        placeholder="Seleccione el rol"
                    />
                    {errors.personType && <p className="text-sm text-red-500">{errors.personType}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="identificationType">Tipo de documento</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione el tipo de documento de identificación</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Select
                        value={identificationType}
                        onChange={(e) => setters.setDocumentType(e.target.value)}
                        options={[
                            { label: "Tarjeta de identidad", value: "TI" },
                            { label: "Cédula de Ciudadanía", value: "CC" },
                            { label: "Cédula de Extranjería", value: "CE" },
                            { label: "Pasaporte", value: "PS" },
                            { label: "Visa", value: "V" },
                            { label: "Otro", value: "OT" },
                        ]}
                        placeholder="Seleccione el tipo de documento"
                    />
                    {errors.identificationType && <p className="text-sm text-red-500">{errors.identificationType}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="identification">Número de documento</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ingrese en forma correcta el número del documento sin puntos ni comas</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="identification"
                        type="text"
                        value={identification}
                        onChange={(e) => setters.setDocumentNumber(e.target.value)}
                    />
                    {errors.identification && <p className="text-sm text-red-500">{errors.identification}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Correo electrónico de la persona</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setters.setEmail(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}