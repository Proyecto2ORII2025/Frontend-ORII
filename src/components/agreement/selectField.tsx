"use client";

import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ErrorMessage from "@/components/ui/error-message";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    id: string;
    label: string;
    tooltipText: string;
    placeholder: string;
    options: SelectOption[];
    defaultValue?: string;
    onValueChange: (value: string) => void;
    error?: string;
    className?: string;
}

export const SelectField = ({
    id,
    label,
    tooltipText,
    placeholder,
    options,
    defaultValue,
    onValueChange,
    error,
    className = "",
}: SelectFieldProps) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center gap-2">
                <Label htmlFor={id}>{label}</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltipText}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Select defaultValue={defaultValue} onValueChange={onValueChange}>
                <SelectTrigger className={error ? "border-error" : ""}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <ErrorMessage message={error} />
        </div>
    );
};