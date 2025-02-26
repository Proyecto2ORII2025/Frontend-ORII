"use client"

import * as React from "react";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const EmailInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => {
        const [value, setValue] = React.useState("");
        const [isValidEmail, setIsValidEmail] = React.useState<null | boolean>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);

            if (newValue.includes("@")) {
                setIsValidEmail(/@unicauca\.edu\.co$/.test(newValue));
            } else {
                setIsValidEmail(null);
            }
        };

        return (
            <div className="relative flex items-center">
                <input
                    type="email"
                    className={cn(
                        "flex h-9 w-full rounded-2xl border border-blueDark/20 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-blueDark/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "pr-9",
                        className
                    )}
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    {...props}
                />

                {isValidEmail !== null && (
                    <div className="absolute right-3">
                        {isValidEmail ? (
                            <CheckCircle className="h-5 w-5 text-accesibility/70" />
                        ) : (
                            <XCircle className="h-5 w-5 text-error/70" />
                        )}
                    </div>
                )}
            </div>
        );
    }
);

EmailInput.displayName = "EmailInput";

export { EmailInput };