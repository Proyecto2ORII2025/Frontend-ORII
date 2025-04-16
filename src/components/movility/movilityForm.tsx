"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMovilityForm } from "@/app/dashboard/movility/handlers/movilityHandlers";
import { useBeforeUnload } from "./useBeforeUnload";
import { PersonDataSection } from "./personDataSection";
import { GeneralInfoSection } from "./generalInfoSection";
import { MovilityDetailsSection } from "./movilityDetailsSection";
import { AcademicDetailsSection } from "./academicDetailsSection";
import { AgreementsSection } from "./agreementsSection";
import { StayTimeSection } from "./stayTimeSection";
import { FormActions } from "./formActions";
import { Movility } from "@/types/movilityType";
import { UnsavedChangesModal } from "@/components/ui/unSavedChangesModal";

interface MovilityFormProps {
  initialValues?: Partial<Movility>;
  movility?: Movility;
  onClose?: () => void;
  isEditing?: boolean;
  onSuccess?: (result: Movility) => void;
}

export function MovilityForm({
  initialValues,
  movility,
  onClose,
  isEditing = false,
  onSuccess
}: MovilityFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  const {
    // Estados
    isDirty,
    firstName,
    lastName,
    gender,
    personType,
    identificationType,
    identification,
    email,
    direction,
    faculty,
    eventTypeId,
    description,
    cta,
    origin,
    destination,
    country,
    city,
    originProgram,
    destinationProgram,
    teacher,
    agreement,
    agreementId,
    funding,
    fundingSource,
    entryDate,
    exitDate,
    stayDays,
    movilityYear,
    errors,

    // Setters
    setFirstName,
    setLastName,
    setGender,
    setRole,
    setDocumentType,
    setDocumentNumber,
    setEmail,
    setDirection,
    setFaculty,
    setEventType,
    setEventDescription,
    setCta,
    setOriginUniversity,
    setDestinationUniversity,
    setCountry,
    setCity,
    setOriginProgram,
    setDestinationProgram,
    setTeacher,
    setAgreement,
    setAgreementId,
    setfunding,
    setFuenteFinanciacion,
    setEntryDate,
    setExitDate,
    setStayDays,
    setMovilityYear,

    // Funciones
    handleSubmit,
    resetForm,
    handleEntryDateChange,
    handleExitDateChange,
    formatDateToInput,
    initializeForm
  } = useMovilityForm();

  useBeforeUnload(isDirty);

  const onSubmit = async (e: React.FormEvent) => {
    const result = await handleSubmit(e, isEditing, movility?.id);

    if (result.success) {
      if (onSuccess) onSuccess(result.data as Movility);
      if (isEditing) {
        onClose?.();
      } else {
        router.push("/dashboard/movility");
      }
    }
  };

  useEffect(() => {
    if (isEditing && movility) {
      initializeForm(movility);
    } else if (initialValues && Object.keys(initialValues).length > 0) {
      initializeForm(initialValues);
    }

  }, [isEditing, movility, initialValues]);

  const handleCancel = () => {
    if (isDirty) {
      setTargetUrl("/dashboard/movility");
      setShowWarningModal(true);
    } else {
      if (movility) {
        onClose?.(); // Cierra el modal/formulario de edición sin resetear
      } else {
        resetForm(); // Reset solo en creación
        router.push("/dashboard/movility");
      }
    }
  };

  const handleConfirmNavigation = () => {
    setShowWarningModal(false);
    if (targetUrl) {
      if (movility) {
        onClose?.();
      } else {
        resetForm();
        router.push(targetUrl);
      }
    }
  };

  useEffect(() => {
    if (!isDirty) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor && anchor.href) {
        const href = anchor.href;
        const targetUrl = new URL(href).pathname;

        if (targetUrl !== pathname) {
          e.preventDefault();
          setTargetUrl(targetUrl);
          setShowWarningModal(true);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isDirty, pathname]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Editar Información de Movilidad" : "Nueva Movilidad"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifique los campos que desea actualizar."
              : "Complete todos los campos requeridos para crear la movilidad."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <PersonDataSection
              firstName={firstName}
              lastName={lastName}
              gender={gender}
              personType={personType}
              identificationType={identificationType}
              identification={identification}
              email={email}
              errors={errors}
              setters={{
                setFirstName,
                setLastName,
                setGender,
                setRole,
                setDocumentType,
                setDocumentNumber,
                setEmail
              }}
            />

            <GeneralInfoSection
              direction={direction}
              faculty={faculty}
              eventTypeId={eventTypeId}
              description={description}
              cta={cta}
              errors={errors}
              setters={{
                setDirection,
                setFaculty,
                setEventType,
                setEventDescription,
                setCta
              }}
            />

            <MovilityDetailsSection
              origin={origin}
              destination={destination}
              country={country}
              city={city}
              errors={errors}
              setters={{
                setOriginUniversity,
                setDestinationUniversity,
                setCountry,
                setCity
              }}
            />

            <AcademicDetailsSection
              originProgram={originProgram}
              destinationProgram={destinationProgram}
              teacher={teacher}
              personType={personType}
              errors={errors}
              setters={{
                setOriginProgram,
                setDestinationProgram,
                setTeacher: personType === "STUDENT" ? setTeacher : () => { }
              }}
            />

            <AgreementsSection
              agreement={agreement}
              agreementId={agreementId}
              funding={funding}
              fundingSource={fundingSource}
              errors={errors}
              setters={{
                setAgreement,
                setAgreementId,
                setfunding,
                setFuenteFinanciacion
              }}
            />

            <StayTimeSection
              entryDate={entryDate}
              exitDate={exitDate}
              stayDays={stayDays}
              movilityYear={movilityYear}
              errors={errors}
              setters={{
                setEntryDate,
                setExitDate,
                setStayDays,
                setMovilityYear
              }}
              handleEntryDateChange={handleEntryDateChange}
              handleExitDateChange={handleExitDateChange}
              formatDateToInput={formatDateToInput}
              direction={direction}
            />

            <FormActions
              submitButtonText={isEditing ? "Actualizar Movilidad" : "Crear Movilidad"}
              submittingText={isEditing ? "Actualizando..." : "Creando..."}
              onCancel={handleCancel}
            />
          </form>
        </CardContent>
      </Card>
      <UnsavedChangesModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        onConfirm={handleConfirmNavigation}
      />
    </>
  );
}