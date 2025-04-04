"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/modals/dialog";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/layout/card";
import { Movility} from "@/types/movilityType";

interface ModalVerProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
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

const roleDict: Record<string, string> = {
  "STUDENT": "Estudiante",
  "TEACHER": "Docente",
  "ADMIN": "Administrativo",
};

const documentTypeDict: Record<string, string> = {
  "CC": "Cédula de Ciudadanía",
  "CE": "Cédula de Extranjería",
  "PS": "Pasaporte",
  "DE": "Documento Extranjero",
  "V": "Visa",
};

const facultyDict: Record<string, string> = {
  "FA": "Facultad de Artes",
  "FCA": "Facultad de Ciencias Agrarias",
  "FCS": "Facultad de Ciencias de la Salud",
  "FCCEA": "Facultad de Ciencias Contables, Económicas y Administrativas",
  "FCH": "Facultad de Ciencias Humanas",
  "FACNED": "Facultad de Ciencias Naturales, Exactas y de la Educación",
  "FDCPS": "Facultad de Derecho, Ciencias Políticas y Sociales",
  "FIC": "Facultad de Ingeniería Civil",
  "FIET": "Facultad de Ingeniería Electrónica y Telecomunicaciones",
};

const eventTypeDict: Record<string, string> = {
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


const handleExitDateChangeView = (entryDate: string, exitDate: string) => {
  if (!entryDate || !exitDate) return "Fechas no disponibles";

  const start = new Date(entryDate);
  const end = new Date(exitDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Fechas inválidas";

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const fixYear = (dateString: string) => {
  if (!dateString) return "Fecha no disponible";

  const parts = dateString.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    if (year < 100) {
      parts[0] = (year + 2000).toString();
    }
  }
  return parts.join("-");
};

const formatDate = (date: string) => {
  if (!date) return "Fecha no disponible";

  const fixedDate = fixYear(date);
  const parsedDate = new Date(fixedDate);

  if (isNaN(parsedDate.getTime())) return "Fecha inválida";

  return parsedDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function ModalVer({ movility, open, onClose }: ModalVerProps) {
  if (!movility) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-lg font-semibold">Detalles de Movilidad</DialogTitle>

        <div className="max-h-[500px] overflow-y-auto p-2">
          <Card>
            <CardContent>
              <div className="space-y-4">

                {/* Información General */}
                <h3 className="font-bold">Información General</h3>
                <p><strong>Tipo de movilidad:</strong> {mobilityTypeDict[movility.direction] || movility.direction}</p>
                <p><strong>Género:</strong> {genderDict[movility.gender] || movility.gender}</p>
                <p><strong>CTA:</strong> {movility.cta}</p>
                <p><strong>Fecha de inicio:</strong> {formatDate(movility.entryDate)}</p>
                <p><strong>Fecha de finalización:</strong> {formatDate(movility.exitDate)}</p>
                <p><strong>Días de estancia:</strong> {handleExitDateChangeView(movility.entryDate, movility.exitDate)}</p>
                <p><strong>Año de movilidad:</strong> {new Date(fixYear(movility.exitDate)).getFullYear()}</p>

                {/* Programas y Facultad */}
                <h3 className="font-bold">Programas y Facultad</h3>
                <p><strong>Programa de Origen:</strong> {movility.originProgram}</p>
                <p><strong>Programa de Acogida:</strong> {movility.destinationProgram}</p>
                <p><strong>Facultad:</strong> {facultyDict[movility.faculty] || movility.faculty}</p>

                {/* Ubicación y Docente */}
                <h3 className="font-bold">Ubicación y Docente</h3>
                <p><strong>Ciudad:</strong> {movility.city}</p>
                <p><strong>País:</strong> {movility.country}</p>
                <p><strong>Docente Responsable:</strong> {movility.teacher}</p>

                {/* Financiación */}
                <h3 className="font-bold">Financiación</h3>
                <div>
                  <strong>Convenio</strong>
                  {movility.agreement ? (
                    <>
                      <p><strong>Institución:</strong> {movility.agreement.institution}</p>
                      <p><strong>Número de convenio:</strong> {movility.agreement.agreementNumber}</p>
                      <p><strong>País:</strong> {movility.agreement.country}</p>
                      <p><strong>Descripción:</strong> {movility.agreement.description}</p>
                      <p><strong>Ámbito:</strong> {movility.agreement.scope}</p>
                      <p><strong>Fecha de inicio:</strong> {formatDate(movility.agreement.startDate)}</p>
                      <p><strong>Estado:</strong> {movility.agreement.status}</p>
                    </>
                  ) : (
                    ": No tiene convenio asociado"
                  )}
                </div>

                <p><strong>Monto de Financiación en pesos:</strong> ${movility.funding}</p>
                <p><strong>Fuente de Financiación:</strong> {movility.fundingSource}</p>

                {/* Origen y Destino */}
                <h3 className="font-bold">Instituciones</h3>
                <p><strong>Institución de Origen:</strong> {movility.origin}</p>
                <p><strong>Institución de Destino:</strong> {movility.destination}</p>

                {/* Evento */}
                <h3 className="font-bold">Evento</h3>
                <p><strong>Tipo de Evento:</strong> {eventTypeDict[movility.event.eventType.eventTypeId.toString()] || movility.event.eventType.eventTypeId}</p>
                <p><strong>Descripción del Evento:</strong> {movility.event.description}</p>

                {/* Información Personal */}
                <h3 className="font-bold">Información Personal</h3>
                <p><strong>Nombre completo:</strong> {movility.person.firstName} {movility.person.lastName}</p>
                <p><strong>Tipo de Documento:</strong> {documentTypeDict[movility.person.identificationType] || movility.person.identificationType}</p>
                <p><strong>Número de Documento:</strong> {movility.person.identification}</p>
                <p><strong>Correo Electrónico:</strong> {movility.person.email}</p>
                <p><strong>Rol:</strong> {roleDict[movility.person.personType] || movility.person.personType}</p>

              </div>

              {/* Botón de cierre */}
              <div className="flex justify-end mt-4">
                <Button onClick={onClose}>Cerrar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
