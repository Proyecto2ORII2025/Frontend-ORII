"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Movility } from "@/types/movilityType";
import { genderDict, roleDict, documentTypeDict, movilityTypeDict, facultyDict, eventTypeDict } from "@/utils/movilityUtils";

interface ModalVerProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
}

const handleExitDateChangeView = (entryDate: string, exitDate: string) => {
  if (!entryDate || !exitDate) return "Fechas no disponibles";

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`); 
  };

  const start = parseDate(entryDate);
  const end = parseDate(exitDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Fechas inválidas";

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export default function ModalVer({ movility, open, onClose }: ModalVerProps) {
  if (!movility) return null;

  const labelClass = "font-bold text-blue-900";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-lg font-semibold text-center text-blue-900">Detalles de Movilidad</DialogTitle>

        <div className="max-h-[500px] overflow-y-auto p-2">
          <Card>
            <CardContent>
              <div className="space-y-4">

                {/* Información General */}
                <h3 className="text-center font-bold text-blue-900 text-base mb-2">Información General</h3>
                <p><span className={labelClass}>Sentido de la movilidad:</span> {movilityTypeDict[movility.direction] || movility.direction}</p>
                <p><span className={labelClass}>Género:</span> {genderDict[movility.gender] || movility.gender}</p>
                <p><span className={labelClass}>Periodo:</span> {movility.cta}</p>
                <p><span className={labelClass}>Fecha de inicio:</span> {movility.entryDate}</p>
                <p><span className={labelClass}>Fecha de finalización:</span> {movility.exitDate}</p>
                <p><span className={labelClass}>Días de estancia:</span> {handleExitDateChangeView(movility.entryDate, movility.exitDate)}</p>
                <p><span className={labelClass}>Año de movilidad:</span> {movility.entryDate.split('-')[2]}</p>

                {/* Programas y Facultad */}
                <h3 className="text-center font-bold text-blue-900 text-base mb-2">Programas y Facultad</h3>
                <p><span className={labelClass}>Programa de Origen:</span> {movility.originProgram}</p>
                <p><span className={labelClass}>Programa de Acogida:</span> {movility.destinationProgram}</p>
                <p><span className={labelClass}>Facultad:</span> {facultyDict[movility.faculty] || movility.faculty}</p>

                {/* Ubicación y Docente */}
                <h3 className="text-center font-bold text-blue-900 text-base mb-2">Ubicación y Docente</h3>
                <p><span className={labelClass}>Ciudad:</span> {movility.city}</p>
                <p><span className={labelClass}>País:</span> {movility.country}</p>
                <p><span className={labelClass}>Docente Responsable:</span> {movility.teacher || "Sin docente responsable"}</p>

                {/* Financiación */}
                <h3 className="text-center font-bold text-blue-900 text-base mb-2">Financiación</h3>

                {movility.agreement ? (
                  <>
                    <h4 className="font-bold text-blue-900 text-base mt-2">Convenio</h4>
                    <p><span className={labelClass}>Institución:</span> {movility.agreement.institution}</p>
                    <p><span className={labelClass}>Número de convenio:</span> {movility.agreement.agreementNumber}</p>
                    <p><span className={labelClass}>País:</span> {movility.agreement.country}</p>
                    <p><span className={labelClass}>Descripción:</span> {movility.agreement.description}</p>
                    <p><span className={labelClass}>Ámbito:</span> {movility.agreement.scope}</p>
                    <p><span className={labelClass}>Fecha de inicio:</span> {movility.agreement.startDate}</p>
                    <p><span className={labelClass}>Estado:</span> {movility.agreement.status}</p>
                  </>
                ) : (
                  <p><span className={labelClass}>Convenio:</span> No tiene convenio asociado</p>
                )}

                <p><span className={labelClass}>Monto de Financiación en pesos:</span> ${movility.funding}</p>
                <p><span className={labelClass}>Fuente de Financiación:</span> {movility.fundingSource}</p>


                {/* Origen y Destino */}
                <h3 className="text-center font-bold text-blue-900 text-base mb-2">Instituciones</h3>
                <p><span className={labelClass}>Institución de Origen:</span> {movility.origin}</p>
                <p><span className={labelClass}>Institución de Destino:</span> {movility.destination}</p>

                {/* Evento */}
                <h3 className="text-center font-bold text-blue-900 text-base mb-2">Evento</h3>
                <p><span className={labelClass}>Tipo de Evento:</span> {eventTypeDict[movility.event.eventType.eventTypeId.toString()] || movility.event.eventType.eventTypeId}</p>
                <p><span className={labelClass}>Descripción del Evento:</span> {movility.event.description}</p>

                {/* Información Personal */}
                <h3 className="text-center font-bold text-blue-900 text-base mb-2">Información Personal</h3>
                <p><span className={labelClass}>Nombre completo:</span> {movility.person.firstName} {movility.person.lastName}</p>
                <p><span className={labelClass}>Tipo de Documento:</span> {documentTypeDict[movility.person.identificationType] || movility.person.identificationType}</p>
                <p><span className={labelClass}>Número de Documento:</span> {movility.person.identification}</p>
                <p><span className={labelClass}>Correo Electrónico:</span> {movility.person.email}</p>
                <p><span className={labelClass}>Rol:</span> {roleDict[movility.person.personType] || movility.person.personType}</p>

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
