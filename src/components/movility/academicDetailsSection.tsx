import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AcademicDetailsSectionProps {
    originProgram: string;
    destinationProgram: string;
    teacher: string;
    movilityType: string;
    personType: string;
    errors: Record<string, string>;
    setters: {
        setOriginProgram: (value: string) => void;
        setDestinationProgram: (value: string) => void;
        setTeacher: (value: string) => void;
    };
}

export function AcademicDetailsSection({
    originProgram,
    destinationProgram,
    teacher,
    movilityType,
    personType,
    errors,
    setters
}: AcademicDetailsSectionProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Detalles académicos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="originProgram">Programa de origen</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nombre del programa del que es originario la persona</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="originProgram"
                        type="text"
                        value={originProgram}
                        onChange={(e) => setters.setOriginProgram(e.target.value)}
                    />
                    {errors.originProgram && <p className="text-sm text-red-500">{errors.originProgram}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="destinationProgram">Programa de acogida</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nombre del programa que va a acoger a la persona</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="destinationProgram"
                        type="text"
                        value={destinationProgram}
                        onChange={(e) => setters.setDestinationProgram(e.target.value)}
                    />
                    {errors.destinationProgram && <p className="text-sm text-red-500">{errors.destinationProgram}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="teacher">Tutor académico</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Se habilita cuando se trate de estudiantes en Movilidad académica ENTRANTE</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="teacher"
                        type="text"
                        value={teacher}
                        onChange={(e) => setters.setTeacher(e.target.value)}
                        disabled={!(
                            (movilityType === "INCOMING_IN_PERSON" || movilityType === "INCOMING_VIRTUAL") &&
                            personType === "STUDENT"
                        )}
                    />
                    {errors.teacher && <p className="text-sm text-red-500">{errors.teacher}</p>}
                </div>
            </div>
        </div>
    );
}