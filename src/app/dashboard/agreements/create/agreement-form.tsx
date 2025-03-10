"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { postAgreement, putAgreement } from "@/services/agreement.service";
import { useRouter } from "next/navigation";
import { Agreement, AgreementForPost } from "../types/agreementsTypes";
import { changeDateFormat } from "../utils";
import { useForm } from "react-hook-form";

export function AgreementForm({ agreement }: { agreement?: Agreement }) {
  const router = useRouter();

  const handleChange = (scope: string) => {
    setValue("scope", scope as "NATIONAL" | "INTERNATIONAL");
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      country: agreement?.country || "",
      agreementNumber: agreement?.agreementNumber || "",
      institution: agreement?.institution || "",
      startDate: changeDateFormat(agreement?.startDate || "", false) || "",
      scope: agreement?.scope || "NATIONAL",
      description: agreement?.description || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (agreement) {
      const updatedAgreement: Agreement = {
        ...agreement,
        country: data.country,
        agreementNumber: data.agreementNumber,
        institution: data.institution,
        startDate: changeDateFormat(data.startDate, true),
        scope: data.scope,
        description: data.description,
      };
      await putAgreement(updatedAgreement);
    } else {
      const newAgreement: AgreementForPost = {
        country: data.country,
        agreementNumber: data.agreementNumber,
        institution: data.institution,
        startDate: changeDateFormat(data.startDate, true),
        scope: data.scope,
        description: data.description,
      };
      await postAgreement(newAgreement);
    }

    router.push("/dashboard/agreements");
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Información del Convenio</CardTitle>
          <CardDescription>
            {agreement
              ? "Cambie los campos que desea editar."
              : "Complete todos los campos requeridos para crear el convenio."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="pais">País</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>País de origen de la institución</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                required
                id="pais"
                placeholder="Ingrese el país"
                {...register("country")}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="codigo">Código</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Código único del convenio</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                required
                id="codigo"
                placeholder="Ingrese el código"
                {...register("agreementNumber")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="institucion">Institución</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nombre de la institución</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              required
              id="institucion"
              placeholder="Ingrese el nombre de la institución"
              {...register("institution")}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="fecha">Fecha de inicio</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fecha de inicio del convenio</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                required
                id="fecha"
                type="date"
                {...register("startDate")}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="ambito">Ámbito</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tipo de convenio</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                required
                defaultValue={agreement?.scope}
                onValueChange={handleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el ámbito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NATIONAL">Nacional</SelectItem>
                  <SelectItem value="INTERNATIONAL">Internacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Descripción detallada del convenio</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              required
              id="descripcion"
              placeholder="Ingrese una descripción del convenio"
              className="min-h-[100px]"
              {...register("description")}
            />
          </div>

          <div className="flex justify-start space-x-4">
            <Button
              className="w-1/4"
              variant="secondary"
              type="button"
              onClick={() => router.push("/dashboard/agreements")}
            >
              Cancelar
            </Button>
            <Button className="w-1/3 md:w-1/4 px-4" type="submit">
              {agreement ? "Editar" : "Crear"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
