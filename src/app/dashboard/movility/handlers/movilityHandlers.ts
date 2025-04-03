import { useState} from "react";
import { createMovilityAction, editMovilityAction } from "@/actions/movilityAction";
import { toast } from "sonner";
import { validateFields, handleExitDateChange, handleEntryDateChange, formatDateToInput } from "@/utils/movilityUtils";
import { Movility } from "@/types/movilityType";
import { useRouter } from "next/navigation";

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
  funding: number;
  fundingSource: string;
  entryDate: string;
  exitDate: string;
  stayDays: number;
  movilityYear: string;
}

export function useMovilityForm(initialValues?: Partial<MovilityFormData>) {
  const router = useRouter();

  // Estados para Datos de la persona movilizada
  const [firstName, setFirstName] = useState(initialValues?.firstName || "");
  const [lastName, setLastName] = useState(initialValues?.lastName || "");
  const [gender, setGender] = useState(initialValues?.gender || "");
  const [personType, setRole] = useState(initialValues?.personType || "");
  const [identificationType, setDocumentType] = useState(initialValues?.identificationType || "");
  const [identification, setDocumentNumber] = useState(initialValues?.identification || "");
  const [email, setEmail] = useState(initialValues?.email || "");

  // Estados para Datos generales de la movilidad
  const [movilityType, setMovilityType] = useState(initialValues?.movilityType || "");
  const [faculty, setFaculty] = useState(initialValues?.faculty || "");
  const [eventTypeId, setEventType] = useState<number>(initialValues?.eventTypeId || 0);
  const [description, setEventDescription] = useState(initialValues?.description || "");
  const [movilityScope, setMovilityScope] = useState(initialValues?.movilityScope || "");
  const [cta, setCta] = useState<number>(initialValues?.cta || 0);

  // Estados para Detalles de la movilidad
  const [origin, setOriginUniversity] = useState(initialValues?.origin || "");
  const [destination, setDestinationUniversity] = useState(initialValues?.destination || "");
  const [country, setCountry] = useState(initialValues?.country || "");
  const [city, setCity] = useState(initialValues?.city || "");

  // Estados para Detalles académicos
  const [originProgram, setOriginProgram] = useState(initialValues?.originProgram || "");
  const [destinationProgram, setDestinationProgram] = useState(initialValues?.destinationProgram || "");
  const [teacher, setTeacher] = useState(initialValues?.teacher || "");

  // Estados para Convenios y patrocinios
  const [agreement, setAgreement] = useState(initialValues?.agreement || "");
  const [agreementId, setAgreementId] = useState<number>(initialValues?.agreementId || 0);
  const [funding, setfunding] = useState(initialValues?.funding || 0);
  const [fundingSource, setFuenteFinanciacion] = useState(initialValues?.fundingSource || "");

  // Estados para Tiempo de la estancia
  const [entryDate, setEntryDate] = useState(initialValues?.entryDate || "");
  const [exitDate, setExitDate] = useState(initialValues?.exitDate || "");
  const [stayDays, setStayDays] = useState(initialValues?.stayDays || 0);
  const [movilityYear, setMovilityYear] = useState(initialValues?.movilityYear || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const initializeForm = (values: Partial<Movility>) => {
    setFirstName(values.person?.firstName || "");
    setLastName(values.person?.lastName || "");
    setGender(values.gender || "");
    setRole(values.person?.personType || "");
    setDocumentType(values.person?.identificationType || "");
    setDocumentNumber(values.person?.identification || "");
    setEmail(values.person?.email || "");
    setMovilityType(values.direction || "");
    setFaculty(values.faculty || "");
    setEventType(values.event?.eventType.eventTypeId || 0);
    setEventDescription(values.event?.description || "");
    setCta(values.cta || 0);
    setOriginUniversity(values.origin || "");
    setDestinationUniversity(values.destination || "");
    setCountry(values.country || "");
    setCity(values.city || "");
    setOriginProgram(values.originProgram || "");
    setDestinationProgram(values.destinationProgram || "");
    setTeacher(values.teacher || "");
    setAgreementId(values.agreement?.agreementId || 0);
    setfunding(values.funding || 0);
    setFuenteFinanciacion(values.fundingSource || "");
    setEntryDate(values.entryDate || "");
    setExitDate(values.exitDate || "");
    setStayDays( Number(values.exitDate) - Number(values.entryDate) || 0);
    setMovilityYear(values.exitDate || "");
  };

  const handleSubmit = async (e: React.FormEvent, isEditing: boolean = false, movilityId?: number) => {
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
      funding,
      fundingSource,
      entryDate,
      exitDate,
      stayDays,
      movilityYear,
    };

    const newErrors = validateFields(fields);

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
      funding: funding || 0,
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
      const loadingMessage = isEditing ? "Actualizando movilidad..." : "Creando movilidad...";
      toast.loading(loadingMessage, { id: "movility-action" });

      let result;
      if (isEditing && movilityId) {
        result = await editMovilityAction(data, movilityId);
      } else {
        result = await createMovilityAction(data);
      }

      if (result.success) {
        const successMessage = isEditing ? "Movilidad actualizada exitosamente" : "Movilidad creada exitosamente";
        toast.success(successMessage, { id: "movility-action" });
        if (!isEditing) resetForm(); 
        router.push("/dashboard/movility");

        return result;
      } else {
        toast.error(result.error || `Error al ${isEditing ? 'actualizar' : 'crear'} la movilidad`, {
          id: "movility-action",
          description: "Verifique los datos ingresados"
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} la movilidad:`, error);
      toast.error(`Error inesperado al ${isEditing ? 'actualizar' : 'crear'} movilidad`, {
        id: "movility-action",
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
    setfunding(0);
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
    setfunding,
    setFuenteFinanciacion,
    setEntryDate,
    setExitDate,
    setStayDays,
    setMovilityYear,

    // Funciones
    initializeForm,
    handleSubmit,
    resetForm,
    handleEntryDateChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleEntryDateChange(e, setEntryDate, exitDate, setExitDate, setStayDays, setMovilityYear),
    handleExitDateChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleExitDateChange(e, entryDate, setExitDate, setStayDays),
    formatDateToInput
  };
}