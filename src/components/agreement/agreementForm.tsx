"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { agreementSchema, AgreementFormValues } from "@/validations/agreementSchema";
import { FormField } from "./formField";
import { TextAreaField } from "./textAreaField";
import { SelectField } from "./selectField";
import { FormActions } from "./formActions";

interface AgreementFormProps {
    onSubmit: (data: AgreementFormValues) => Promise<void>;
    initialValues?: AgreementFormValues;
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function AgreementForm({
    onSubmit,
    initialValues,
    isSubmitting,
}: AgreementFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<AgreementFormValues>({
        resolver: zodResolver(agreementSchema),
        defaultValues: initialValues || {
            country: "",
            agreementNumber: "",
            institution: "",
            startDate: "",
            scope: "NATIONAL",
            description: "",
            status: "ACTIVE"
        }
    });

    const handleScopeChange = (value: string) => {
        setValue("scope", value === "nacional" ? "NATIONAL" : "INTERNATIONAL", {
            shouldValidate: true
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información del Convenio</CardTitle>
                <CardDescription>Complete todos los campos requeridos para crear el convenio.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            id="country"
                            label="País"
                            tooltipText="País de origen de la institución"
                            placeholder="Ingrese el país"
                            register={register("country")}
                            error={errors.country?.message}
                        />
                        <FormField
                            id="agreementNumber"
                            label="Código"
                            tooltipText="Código único del convenio"
                            placeholder="Ingrese el código"
                            register={register("agreementNumber")}
                            error={errors.agreementNumber?.message}
                        />
                    </div>

                    <FormField
                        id="institution"
                        label="Institución"
                        tooltipText="Nombre de la institución"
                        placeholder="Ingrese el nombre de la institución"
                        register={register("institution")}
                        error={errors.institution?.message}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            id="startDate"
                            label="Fecha de inicio"
                            tooltipText="Fecha de inicio del convenio"
                            placeholder=""
                            type="date"
                            register={register("startDate")}
                            error={errors.startDate?.message}
                        />

                        <SelectField
                            id="scope"
                            label="Ámbito"
                            tooltipText="Tipo de convenio"
                            placeholder="Seleccione el ámbito"
                            options={[
                                { value: "nacional", label: "Nacional" },
                                { value: "internacional", label: "Internacional" }
                            ]}
                            defaultValue="nacional"
                            onValueChange={handleScopeChange}
                            error={errors.scope?.message}
                        />
                    </div>

                    <TextAreaField
                        id="description"
                        label="Descripción"
                        tooltipText="Descripción detallada del convenio"
                        placeholder="Ingrese una descripción del convenio"
                        register={register("description")}
                        error={errors.description?.message}
                    />

                    <FormActions
                        isSubmitting={isSubmitting}
                        onCancel={() => reset()}
                    />
                </form>
            </CardContent>
        </Card>
    );
}