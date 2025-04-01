"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMovilityForm } from "@/app/dashboard/movility/handlers/movilityHandlers";
import { PersonDataSection } from "./personDataSection";
import { GeneralInfoSection } from "./generalInfoSection";
import { MovilityDetailsSection } from "./movilityDetailsSection";
import { AcademicDetailsSection } from "./academicDetailsSection";
import { AgreementsSection } from "./agreementsSection";
import { StayTimeSection } from "./stayTimeSection";
import { FormActions } from "./formActions";

interface MovilityFormProps {
  //initialValues?: any; // Define un tipo adecuado si es necesario
  onClose?: () => void;
}

export function MovilityForm({onClose }: MovilityFormProps) {
  const {
    // Estados
    firstName,
    lastName,
    gender,
    personType,
    identificationType,
    identification,
    email,
    movilityType,
    faculty,
    eventTypeId,
    description,
    movilityScope,
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
    valorFinanciacion,
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
    setMovilityType,
    setFaculty,
    setEventType,
    setEventDescription,
    setMovilityScope,
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
    setValorFinanciacion,
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
    formatDateToInput
  } = useMovilityForm();

  const handleCancel = () => {
    resetForm();
    onClose?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la movilidad</CardTitle>
        <CardDescription>
          Complete todos los campos requeridos para crear el formulario de movilidad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            movilityType={movilityType}
            faculty={faculty}
            eventTypeId={eventTypeId}
            description={description}
            movilityScope={movilityScope}
            cta={cta}
            errors={errors}
            setters={{
              setMovilityType,
              setFaculty,
              setEventType,
              setEventDescription,
              setMovilityScope,
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
            movilityType={movilityType}
            personType={personType}
            errors={errors}
            setters={{
              setOriginProgram,
              setDestinationProgram,
              setTeacher
            }}
          />

          <AgreementsSection
            agreement={agreement}
            agreementId={agreementId}
            valorFinanciacion={valorFinanciacion}
            fundingSource={fundingSource}
            errors={errors}
            setters={{
              setAgreement,
              setAgreementId,
              setValorFinanciacion,
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
          />

          <FormActions
            submitButtonText="Crear Movilidad"
            submittingText="Creando..."
            onCancel={handleCancel}
          />
        </form>
      </CardContent>
    </Card>
  );
}