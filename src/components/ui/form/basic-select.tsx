"use client";

interface SelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
}

export function Select({ value, onChange, options, placeholder }: SelectProps) {
    return (
        <select
            className="border rounded-md p-2 w-full"
            value={value}
            onChange={onChange}
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
