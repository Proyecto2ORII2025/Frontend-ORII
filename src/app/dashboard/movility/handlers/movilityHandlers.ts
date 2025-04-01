import { useState } from "react";
import { createMovilityAction } from "@/actions/movilityAction";
import { toast } from "sonner";
import { validateFields, handleExitDateChange, handleEntryDateChange,formatDateToInput } from "@/utils/movilityUtils";

export interface MovilityFormData {
  firstName: string;
  lastName: string;
  gender: string;
  personType: string;
  identificationType: string;
  identification: string;
  email: string;
  movilityType: string;
  faculty: string;
  eventTypeId: number;
  description: string;
  movilityScope: string;
  cta: number;
  origin: string;
  destination: string;
  country: string;
  city: string;
  originProgram: string;
  destinationProgram: string;
  teacher: string;
  agreement: string;
  agreementId: number;
  valorFinanciacion: string;
  fundingSource: string;
  entryDate: string;
  exitDate: string;
  stayDays: number;
  movilityYear: string;
}

export function useMovilityForm() {
  // Estados para Datos de la persona movilizada
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [personType, setRole] = useState("");
  const [identificationType, setDocumentType] = useState("");
  const [identification, setDocumentNumber] = useState("");
  const [email, setEmail] = useState("");

  // Estados para Datos generales de la movilidad
  const [movilityType, setMovilityType] = useState("");
  const [faculty, setFaculty] = useState("");
  const [eventTypeId, setEventType] = useState<number>(0);
  const [description, setEventDescription] = useState("");
  const [movilityScope, setMovilityScope] = useState("");
  const [cta, setCta] = useState<number>(0);

  // Estados para Detalles de la movilidad
  const [origin, setOriginUniversity] = useState("");
  const [destination, setDestinationUniversity] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  // Estados para Detalles académicos
  const [originProgram, setOriginProgram] = useState("");
  const [destinationProgram, setDestinationProgram] = useState("");
  const [teacher, setTeacher] = useState("");

  // Estados para Convenios y patrocinios
  const [agreement, setAgreement] = useState("");
  const [agreementId, setAgreementId] = useState<number>(0);
  const [valorFinanciacion, setValorFinanciacion] = useState("");
  const [fundingSource, setFuenteFinanciacion] = useState("");

  // Estados para Tiempo de la estancia
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [stayDays, setStayDays] = useState(0);
  const [movilityYear, setMovilityYear] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields: MovilityFormData = {
      firstName,
      lastName,
      gender,
      cta,
      personType,
      identificationType,
      identification,
      email,
      movilityType,
      faculty,
      eventTypeId,
      description,
      movilityScope,
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
    };

    const newErrors = validateFields(fields);
    console.log("Errores después de validación:", errors);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Por favor complete todos los campos obligatorios");
      return { success: false, errors: newErrors };
    }

    const data = {
      orii: true,
      direction: movilityType,
      gender,
      cta,
      entryDate,
      exitDate,
      originProgram,
      destinationProgram,
      city,
      country,
      teacher,
      faculty,
      funding: parseFloat(valorFinanciacion) || 0,
      fundingSource,
      destination,
      origin,
      agreementId: agreement === "Y" ? agreementId : null,
      event: {
        description,
        eventTypeId,
      },
      person: {
        identificationType,
        personType,
        firstName,
        lastName,
        identification,
        email,
      },
    };

    try {
      toast.loading("Creando movilidad...", { id: "create-movility" });
      const result = await createMovilityAction(data);

      if (result.success) {
        toast.success("Movilidad creada exitosamente", { id: "create-movility" });
        resetForm();
        return result;
      } else {
        toast.error(result.error || "Error al crear la movilidad", {
          id: "create-movility",
          description: "Verifique los datos ingresados"
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Error al crear la movilidad:", error);
      toast.error("Error inesperado al crear movilidad", {
        id: "create-movility",
        description: "Por favor intente nuevamente"
      });
      return { success: false, error: "Hubo un problema al guardar los datos." };
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setGender("");
    setRole("");
    setDocumentType("");
    setDocumentNumber("");
    setEmail("");
    setMovilityType("");
    setFaculty("");
    setEventType(0);
    setEventDescription("");
    setMovilityScope("");
    setCta(0);
    setOriginUniversity("");
    setDestinationUniversity("");
    setCountry("");
    setCity("");
    setOriginProgram("");
    setDestinationProgram("");
    setTeacher("");
    setAgreement("");
    setAgreementId(0);
    setValorFinanciacion("");
    setFuenteFinanciacion("");
    setEntryDate("");
    setExitDate("");
    setStayDays(0);
    setMovilityYear("");
    setErrors({});
  };

  return {
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
    handleEntryDateChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleEntryDateChange(e, setEntryDate, exitDate, setExitDate, setStayDays, setMovilityYear),
    handleExitDateChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleExitDateChange(e, entryDate, setExitDate, setStayDays),
    formatDateToInput
  };
}