"use client";

import { Info } from "lucide-react";
import { Label } from "@/components/ui/typography/label";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/navigation/tooltip";
import { RadioGroup, Radio } from "@heroui/radio";
import ErrorMessage from "@/components/ui/feedback/error-message";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  tooltipText: string;
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

      <RadioGroup
        color="primary"
        size="sm"
        className={
          `border rounded-xl p-2 ${error ? "border-error" : ""
          }`
        }
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        {options.map((option) => (
          <Radio
            key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
      <ErrorMessage message={error} />

    </div>
  );
};
