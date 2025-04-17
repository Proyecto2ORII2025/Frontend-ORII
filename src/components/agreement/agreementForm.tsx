"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import {
  agreementSchema,
  AgreementFormValues,
} from "@/validations/agreementSchema";
import { FormField } from "@/components/ui/form/formField";
import { TextAreaField } from "@/components/ui/form/textAreaField";
import { RadioSelectField } from "@/components/ui/form/radioSelectField";
import { AgreementProps } from "@/types/agreementType";
import { useAgreementHandlers } from "@/app/dashboard/agreements/handlers/agreementHandlers";
import { useRouter } from "next/navigation";
import { changeDateFormat } from "@/utils/formatChanger";
import { Ban, Handshake } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";

interface AgreementFormProps {
  initialValues?: AgreementFormValues;
  agreement?: AgreementProps;
  onCloseU?: () => void;
}

export default function AgreementForm({
  initialValues,
  agreement,
  onCloseU,
}: AgreementFormProps) {
  const router = useRouter();
  const { handleCreateAgreement, handleEditAgreement, isSubmitting } =
    useAgreementHandlers(agreement?.agreementId);

  const defaultScope = agreement
    ? agreement.scope === "NATIONAL"
      ? "nacional"
      : "internacional"
    : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AgreementFormValues>({
    resolver: zodResolver(agreementSchema),
    defaultValues: initialValues || {
      country: agreement ? agreement.country : "",
      agreementNumber: agreement ? agreement.agreementNumber : "",
      institution: agreement ? agreement.institution : "",
      startDate: agreement ? changeDateFormat(agreement.startDate, false) : "",
      scope: agreement ? agreement.scope : undefined,
      description: agreement ? agreement.description : "",
    },
  });

  const handleCancel = () => {
    if (agreement) {
      onCloseU?.();
    } else {
      router.push("/dashboard/agreements");
    }
  };

  const handleScopeChange = (value: string) => {
    setValue("scope", value === "nacional" ? "NATIONAL" : "INTERNATIONAL", {
      shouldValidate: true,
    });
  };

  return (
    <div className="container">
      <Card className="max-w-2xl border-l-4 border-l-blue border-r-0 border-t-0 border-b-0 rounded-l-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue/10 to-transparent pb-6">
          <div className="flex items-center gap-3">
            <Handshake className="h-6 w-6 text-blue" />
            <CardTitle className="text-blueDark text-2xl">
              {agreement ? "Edición de Convenio" : "Registro de Convenio"}
            </CardTitle>
          </div>
          <CardDescription className="text-blueDark/70 mt-2">
            {agreement
              ? "Modifique los campos que desea editar."
              : "Complete todos los campos requeridos para crear el convenio."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-8">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(
              agreement ? handleEditAgreement : handleCreateAgreement
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <FormField
                id="institution"
                label="Institución"
                tooltipText="Nombre de la institución"
                placeholder="Ingrese el nombre de la institución"
                register={register("institution")}
                error={errors.institution?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="startDate"
                label="Fecha de inicio"
                tooltipText="Fecha de inicio del convenio"
                placeholder=""
                type="date"
                register={register("startDate")}
                error={errors.startDate?.message}
              />

              <RadioSelectField
                id="scope"
                label="Ámbito"
                tooltipText="Tipo de convenio"
                options={[
                  { value: "nacional", label: "Nacional" },
                  { value: "internacional", label: "Internacional" },
                ]}
                defaultValue={defaultScope}
                onValueChange={handleScopeChange}
                error={errors.scope?.message}
              />
            </div>

            <div>
              <TextAreaField
                id="description"
                label="Descripción"
                tooltipText="Descripción detallada del convenio"
                placeholder="Ingrese una descripción del convenio"
                register={register("description")}
                error={errors.description?.message}
              />
            </div>

            <div className="pt-4 flex gap-4 justify-center">
              <Button
                type="submit"
                variant={"default"}
                disabled={isSubmitting}
              >
                <Handshake className="h-4 w-4 mr-2" />
                {isSubmitting
                  ? (agreement ? "Editando..." : "Creando...")
                  : (agreement ? "Editar convenio" : "Crear convenio")}
              </Button>

              <Button
                type="button"
                variant={"delete"}
                className="w-2/4"
                onClick={handleCancel}
              >
                <Ban className="h-4 w-4 mr-2" />
                {agreement ? "Cancelar" : "Cancelar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}