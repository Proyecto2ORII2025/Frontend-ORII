"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/modals/dialog";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/layout/card";
import { Movility, MovilityCrear } from "@/types/movilityType";
import { editMovilityAction } from "@/actions/movilityAction";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/form/select";

interface ModalEditProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedMovility: Movility) => void;
}

const mobilityTypeDict: Record<string, string> = {
  "INCOMING_IN_PERSON": "Entrante en persona",
  "OUTGOING_IN_PERSON": "Saliente en persona",
  "INCOMING_VIRTUAL": "Entrante virtual",
  "OUTGOING_VIRTUAL": "Saliente virtual",
};

const genderDict: Record<string, string> = {
  "M": "Masculino",
  "F": "Femenino",
};

const roleDict = {
  STUDENT: "Estudiante",
  TEACHER: "Docente",
  ADMIN: "Administrativo",
};

const documentTypeDict = {
  "CC": "Cédula de Ciudadanía",
  "CE": "Cédula de Extranjería",
  "PS": "Pasaporte",
  "DE": "Documento extranjero",
  "V": "Visa",
};

const facultyDict = {
  FA: "Facultad de Artes",
  FCA: "Facultad de Ciencias Agrarias",
  FCS: "Facultad de Ciencias de la Salud",
  FCCEA: "Facultad de Ciencias Contables, Económicas y Administrativas",
  FCH: "Facultad de Ciencias Humanas",
  FACNED: "Facultad de Ciencias Naturales, Exactas y de la Educación",
  FDCPS: "Facultad de Derecho, Ciencias Políticas y Sociales",
  FIC: "Facultad de Ingeniería Civil",
  FIET: "Facultad de Ingeniería Electrónica y Telecomunicaciones",
};

const eventTypeDict = {
  "1": "Asistencia a evento",
  "2": "Misión",
  "3": "Curso corto",
  "4": "Estancia de investigación",
  "5": "Semestre académico de intercambio",
  "6": "Doble titulación",
  "7": "Pasantía o práctica",
  "8": "Rotación médica",
  "9": "Profesor visitante",
  "10": "Profesor de programa de pregrado",
  "11": "Profesor de programa de especialización",
  "12": "Profesor de programa de maestría",
  "13": "Profesor de programa de doctorado",
  "14": "Profesor de programa de postdoctorado",
  "15": "Estudios de maestría",
  "16": "Estudios de doctorado",
  "17": "Estudios de posdoctorado",
  "18": "Internacionalización en casa",
  "19": "Voluntariado",
};

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
      cta: 1,
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

                <label className="block text-sm font-medium">Tipo de Movilidad</label>
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

                {/* Campo para agreementId */}
                {formData.agreement?.agreementId !== null ? (
                  // Si ya existe un convenio, mostrar un campo para editar el agreementId
                  <>
                    <label className="block text-sm font-medium">ID del Convenio</label>
                    <Input
                      type="number"
                      name="agreementId"
                      value={formData.agreement?.agreementId || ""}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  // Si no existe un convenio, preguntar si se desea añadir uno
                  <>
                    <label className="block text-sm font-medium">¿Desea añadir un convenio?</label>
                    <Select
                      value={formData.agreement?.agreementId !== null ? "Y" : "N"} // "Y" para sí, "N" para no
                      onValueChange={(value) =>
                        setFormData((prev) =>
                          prev ? { ...prev, agreementId: value === "Y" ? 0 : null } : null
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue>{formData.agreement?.agreementId !== null ? "Sí" : "No"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Y">Sí</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Mostrar el campo para agreementId si el usuario selecciona "Sí" */}
                    {formData.agreement?.agreementId !== null && (
                      <>
                        <label className="block text-sm font-medium">ID del Convenio</label>
                        <Input
                          type="number"
                          name="agreementId"
                          value={formData.agreement?.agreementId || ""}
                          onChange={handleChange}
                        />
                      </>
                    )}
                  </>
                )}


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
