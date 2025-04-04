"use client";

import { Info } from "lucide-react";
import { Label } from "@/components/ui/typography/label";
import { Textarea } from "@/components/ui/form/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import ErrorMessage from "@/components/ui/feedback/error-message";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaFieldProps {
    id: string;
    label: string;
    tooltipText: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
    className?: string;
}

export const TextAreaField = ({
    id,
    label,
    tooltipText,
    placeholder,
    register,
    error,
    className = "",
}: TextAreaFieldProps) => {
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
            <Textarea
                id={id}
                placeholder={placeholder}
                className={`min-h-[100px] ${error ? "border-error" : ""}`}
                {...register}
            />
            <ErrorMessage message={error} />
        </div>
    );
};