"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAgrement } from "@/services/agreement.service";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agreement } from "./types/agreementsTypes";

interface Props {
  nationalAgreements: Agreement[];
  internationalAgreements: Agreement[];
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AgreementsTable({nationalAgreements, internationalAgreements, setRefreshFlag}: Props) {
  const router = useRouter();
  
  const handleEdit = (agreementId: number) => {
    router.push(`/dashboard/agreements/${agreementId}/edit`);
  };

  async function handleRemoveAgreement(agreementId: number) {
    await deleteAgrement(agreementId);
    setRefreshFlag((prev) => !prev);
  }

  const [, setActiveTab] = useState("nacional");

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "ACTIVE":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>
        );
      case "INACTIVE":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendiente</Badge>
        );
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  return (
    <Tabs
      defaultValue="nacional"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="nacional">Nacionales</TabsTrigger>
        <TabsTrigger value="internacional">Internacionales</TabsTrigger>
      </TabsList>

      <TabsContent value="nacional" className="space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  País
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Institución
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Código
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Descripción
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Fecha de inicio
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Estado
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {nationalAgreements.map((convenio) => (
                <tr key={convenio.agreementId} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{convenio.country}</td>
                  <td className="px-4 py-3">{convenio.institution}</td>
                  <td className="px-4 py-3">{convenio.agreementNumber}</td>
                  <td
                    className="px-4 py-3 max-w-xs truncate"
                    title={convenio.description}
                  >
                    {convenio.description}
                  </td>
                  <td className="px-4 py-3">{convenio.startDate}</td>
                  <td className="px-4 py-3">
                    {getStatusBadge(convenio.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-tertiary/30 hover:bg-tertiary/40 text-tertiary/80 border-tertiary/50"
                        onClick={() => handleEdit(convenio.agreementId)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        onClick={() =>
                          handleRemoveAgreement(convenio.agreementId)
                        }
                        variant="outline"
                        size="sm"
                        className="bg-rose-100 hover:bg-rose-200 text-rose-700 border-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="internacional" className="space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  País
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Institución
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Código
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Descripción
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Fecha de inicio
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Estado
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {internationalAgreements.map((convenio) => (
                <tr key={convenio.agreementId} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{convenio.country}</td>
                  <td className="px-4 py-3">{convenio.institution}</td>
                  <td className="px-4 py-3">{convenio.agreementNumber}</td>
                  <td
                    className="px-4 py-3 max-w-xs truncate"
                    title={convenio.description}
                  >
                    {convenio.description}
                  </td>
                  <td className="px-4 py-3">{convenio.startDate}</td>
                  <td className="px-4 py-3">
                    {getStatusBadge(convenio.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-tertiary/30 hover:bg-tertiary/40 text-tertiary/80 border-tertiary/50"
                        onClick={() => handleEdit(convenio.agreementId)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        onClick={() =>
                          handleRemoveAgreement(convenio.agreementId)
                        }
                        variant="outline"
                        size="sm"
                        className="bg-rose-100 hover:bg-rose-200 text-rose-700 border-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
