import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/navigation/dropdown-menu";
import { Button } from "@/components/ui/buttons/button";
import { Check, X } from "lucide-react";
import { FilterSelectorProps } from "@/types/filterChartType";

export default function filterSelector({
    filterName,
    filterValues,
    activeValue,
    onSelect,
    onRemove,
}: FilterSelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"
                        className="w-full md:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
                    >
                        {filterName} {activeValue && `: ${activeValue}`}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    {filterValues.map((value) => (
                        <DropdownMenuItem key={value} onClick={() => onSelect(value)}>
                            {value}
                            {activeValue === value && <Check className="ml-auto text-accesibility" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>

            </DropdownMenu>
            <button onClick={onRemove}
                className="mr-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 rounded-full w-5 h-5 flex items-center justify-center">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}