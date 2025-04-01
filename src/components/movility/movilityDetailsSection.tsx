import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MovilityDetailsSectionProps {
    origin: string;
    destination: string;
    country: string;
    city: string;
    errors: Record<string, string>;
    setters: {
        setOriginUniversity: (value: string) => void;
        setDestinationUniversity: (value: string) => void;
        setCountry: (value: string) => void;
        setCity: (value: string) => void;
    };
}

export function MovilityDetailsSection({
    origin,
    destination,
    country,
    city,
    errors,
    setters
}: MovilityDetailsSectionProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Detalles de la movilidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="origin">Universidad de origen</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nombre de la universidad de origen de la movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="origin"
                        type="text"
                        value={origin}
                        onChange={(e) => setters.setOriginUniversity(e.target.value)}
                    />
                    {errors.origin && <p className="text-sm text-red-500">{errors.origin}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="destination">Universidad de destino</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nombre de la universidad de destino de la movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="destination"
                        type="text"
                        value={destination}
                        onChange={(e) => setters.setDestinationUniversity(e.target.value)}
                    />
                    {errors.destination && <p className="text-sm text-red-500">{errors.destination}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="country">País</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nombre del país en donde realiza la movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setters.setCountry(e.target.value)}
                    />
                    {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nombre de la ciudad en donde realiza la movilidad</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setters.setCity(e.target.value)}
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
            </div>
        </div>

    );
}