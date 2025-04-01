"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Movility, MovilityCrear} from "@/types/movilityType";
import { editMovilityAction } from "@/actions/movilityAction";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {genderDict, roleDict, documentTypeDict, mobilityTypeDict, facultyDict, eventTypeDict, CTADict } from "@/utils/movilityUtils"

interface ModalEditProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedMovility: Movility) => void;
}

export default function ModalEdit({ movility, open, onClose, onUpdate }: ModalEditProps) {
  const [formData, setFormData] = useState<Movility | null>(movility);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(movility);
  }, [movility]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      console.log("Datos enviados a editMovilityAction:", formData)

      if (!prev) return null;

      if (["firstName", "lastName", "identification", "email", "identificationType"].includes(name)) {
        return {
          ...prev,
          person: {
            ...prev.person,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);

    const formattedData: MovilityCrear = {
      orii: true,
      direction: formData.direction,
      gender: formData.gender,
      cta: formData.cta,
      entryDate: formData.entryDate,
      exitDate: formData.exitDate,
      originProgram: formData.originProgram,
      destinationProgram: formData.destinationProgram,
      city: formData.city,
      country: formData.country,
      teacher: formData.teacher,
      faculty: formData.faculty,
      funding: formData.funding || 0,
      fundingSource: formData.fundingSource,
      destination: formData.destination,
      origin: formData.origin,
      agreementId: formData.agreement?.agreementId ?? null,
      event: {
        description: formData.event.description || "",
        eventTypeId: formData.event.eventType?.eventTypeId || 0,
      },
      person: {
        identificationType: formData.person.identificationType || "",
        personType: formData.person.personType || "",
        firstName: formData.person.firstName || "",
        lastName: formData.person.lastName || "",
        identification: formData.person?.identification || "",
        email: formData.person.email || "",
      },
    };

    console.log("Datos enviados a editMovilityAction:", formattedData);

    const response = await editMovilityAction(formattedData, formData.id);

    setLoading(false);

    if (response.success) {
      onUpdate(formData);
      onClose();
    } else {
      console.error("Error al actualizar la movilidad");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-lg font-semibold">Editar Movilidad</DialogTitle>

        <div className="max-h-[500px] overflow-y-auto p-2">
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Información de la movilidad */}
                <h2 className="text-lg font-bold">Información de la movilidad</h2>
                <p className="text-sm text-gray-500">Complete todos los campos requeridos para editar el reporte de movilidad.</p>

                {/* Datos de la persona movilizada */}
                <h3 className="font-bold">Datos de la persona movilizada</h3>

                <label className="block text-sm font-medium">Nombres</label>
                <Input type="text" name="firstName" value={formData.person.firstName || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Apellidos</label>
                <Input type="text" name="lastName" value={formData.person.lastName || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Género</label>
                <Select
                  value={formData.gender || ""}
                  onValueChange={(value) =>
                    setFormData((prev) =>
                      prev ? { ...prev, gender: value } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {genderDict[formData.gender as keyof typeof genderDict] || "Seleccione el género"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(genderDict).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Periodo</label>
                <Select
                  value={formData.cta?.toString() || ""}
                  onValueChange={(value) =>
                    setFormData((prev) =>
                      prev ? { ...prev, cta: Number(value) } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {CTADict[formData.cta?.toString() as keyof typeof CTADict] || "Seleccione un periodo"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CTADict).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Rol</label>
                <Select
                  value={formData.person?.personType || ""}
                  onValueChange={(value) =>
                    setFormData((prev) =>
                      prev ? { ...prev, person: { ...prev.person, personType: value } } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {roleDict[formData.person?.personType as keyof typeof roleDict] || "Seleccione el rol"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleDict).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Tipo de Documento</label>
                <Select
                  value={formData.person?.identificationType || ""}
                  onValueChange={(value) =>
                    setFormData((prev) =>
                      prev ? { ...prev, person: { ...prev.person, identificationType: value } } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {documentTypeDict[formData.person?.identificationType as keyof typeof documentTypeDict] || "Seleccione el tipo de documento"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(documentTypeDict).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Número de Identificación</label>
                <Input type="text" name="identification" value={formData.person?.identification || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Correo Electrónico</label>
                <Input type="email" name="email" value={formData.person?.email || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Sentido de la movilidad</label>
                <Select
                  name="direction"
                  value={formData.direction}
                  onValueChange={(value) => setFormData((prev) => prev ? { ...prev, direction: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue>{mobilityTypeDict[formData.direction] || "Seleccionar"}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(mobilityTypeDict).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Facultad</label>
                <Select
                  value={formData.faculty || ""}
                  onValueChange={(value) =>
                    setFormData((prev) =>
                      prev ? { ...prev, faculty: value } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {facultyDict[formData.faculty as keyof typeof facultyDict] || "Seleccione una facultad"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(facultyDict).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Tipo de evento</label>
                <Select
                  value={formData.event?.eventType?.eventTypeId?.toString() || ""}
                  onValueChange={(value) =>
                    setFormData((prev) =>
                      prev
                        ? {
                          ...prev,
                          event: {
                            ...prev.event,
                            eventType: {
                              ...prev.event?.eventType,
                              eventTypeId: Number(value),
                            },
                          },
                        }
                        : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {eventTypeDict[formData.event?.eventType?.eventTypeId?.toString() as keyof typeof eventTypeDict] || "Seleccione un tipo de evento"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(eventTypeDict).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="block text-sm font-medium">Descripción del Evento</label>
                <Input type="text" name="event.description" value={formData.event?.description || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Universidad de origen</label>
                <Input type="text" name="origin" value={formData.origin || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Universidad de destino</label>
                <Input type="text" name="destination" value={formData.destination || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">País</label>
                <Input type="text" name="country" value={formData.country || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Programa de origen</label>
                <Input type="text" name="originProgram" value={formData.originProgram || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Programa de acogida</label>
                <Input type="text" name="destinationProgram" value={formData.destinationProgram || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Tutor</label>
                <Input type="text" name="teacher" value={formData.teacher || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Valor de la finanación en pesos</label>
                <Input type="text" name="funding" value={formData.funding || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Fuente de la finanación</label>
                <Input type="text" name="fundingSource" value={formData.fundingSource || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Fecha de Entrada</label>
                <Input type="date" name="entryDate" value={formData.entryDate || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Fecha de Salida</label>
                <Input type="date" name="exitDate" value={formData.exitDate || ""} onChange={handleChange} />

                <label className="block text-sm font-medium">Número de convenio</label>
                <Input type="text" name="agreementId" value={formData.agreement?.agreementId.toString() || ""} onChange={handleChange} />
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
